# Generated by Django 2.2.6 on 2019-10-31 19:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('churches', '0003_church_address'),
    ]

    operations = [
        migrations.AlterField(
            model_name='church',
            name='address',
            field=models.CharField(max_length=350),
        ),
    ]
