# Generated by Django 2.2.6 on 2019-10-31 22:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('churches', '0006_auto_20191031_2132'),
    ]

    operations = [
        migrations.AlterField(
            model_name='church',
            name='lat',
            field=models.FloatField(default=0),
        ),
        migrations.AlterField(
            model_name='church',
            name='lng',
            field=models.FloatField(default=0),
        ),
    ]