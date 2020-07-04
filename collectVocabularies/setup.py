from setuptools import setup, find_packages
from os.path import join, dirname

setup(
    name='onto_metrics',
    version='1.0',
    packages=find_packages(),
    entry_points={},
    install_requires=[
        'numpy',
        'requests',
        'pandas',
        'xlsxwriter',
    ]
)
