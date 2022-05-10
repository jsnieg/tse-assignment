import os
import urllib
import shutil
import azureml

from azureml.core import Experiment
from azureml.core import Workspace, Run
from azureml.core import Environment
from azureml.core import Dataset
from azureml.core import ScriptRunConfig

from azureml.core.compute import ComputeTarget, AmlCompute
from azureml.core.compute_target import ComputeTargetException

subscription_id = '8872abb7-b891-40bd-a745-b88ed6dd6dfe'
resource_group = 'azureml-kough'
workspace_name = 'main'

workspace = Workspace(subscription_id, resource_group, workspace_name)

dataset = Dataset.get_by_name(workspace, name='mnist-dataset')
dataset.download(target_path='', overwrite=False)

# list the files referenced by dataset
dataset.to_path()


"""   Create compute target   """

cluster_name = "gpu-cluster"

try:
    compute_target = ComputeTarget(workspace=workspace, name=cluster_name)
    print('Found existing compute target')
except ComputeTargetException:
    print('Creating a new compute target...')
    compute_config = AmlCompute.provisioning_configuration(vm_size='STANDARD_NC6', 
                                                           max_nodes=2)

    compute_target = ComputeTarget.create(workspace, cluster_name, compute_config)

    compute_target.wait_for_completion(show_output=True, min_node_count=None, timeout_in_minutes=20)


"""   Specify environment   """

tf_env = Environment.from_conda_specification(name='tensorflow-2.8-gpu', file_path='./conda_dependencies.yml')

# Specify a GPU base image
azureml.core.runconfig.DockerConfiguration(use_docker=True)
# tf_env.docker.enabled = True
tf_env.docker.base_image = 'mcr.microsoft.com/azureml/openmpi3.1.2-cuda10.1-cudnn7-ubuntu18.04'


"""   Create script run   """

azureml._restclient.snapshots_client.SNAPSHOT_MAX_SIZE_BYTES = 600000000

args = ['--data-folder', dataset.as_mount("/kough/dataset"),
        '--batch-size', 32,
        '--first-layer-neurons', 256,
        '--second-layer-neurons', 128,
        '--learning-rate', 0.01]

src = ScriptRunConfig(source_directory='./',
                      script='train.py',
                      arguments=args,
                      compute_target=compute_target,
                      environment=tf_env)


"""   Run   """

run = Experiment(workspace=workspace, name='Tutorial-TF-Mnist').submit(src)
run.wait_for_completion(show_output=True)

