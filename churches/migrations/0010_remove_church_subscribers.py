# Generated by Django 2.2.6 on 2019-11-05 20:51

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('churches', '0009_auto_20191105_1932'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='church',
            name='subscribers',
        ),
    ]