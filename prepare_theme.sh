pip install -r theme_common/requirements.txt
python theme_common/scripts/combine_theme_resources.py theme_common/resources theme_override/resources dist/_theme
python theme_common/scripts/combine_mkdocs_config_yaml.py theme_common/mkdocs.yml theme_override/mkdocs.yml mkdocs.yml
