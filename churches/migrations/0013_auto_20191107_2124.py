# Generated by Django 2.2.6 on 2019-11-07 21:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('churches', '0012_auto_20191106_1648'),
    ]

    operations = [
        migrations.CreateModel(
            name='Subscriber',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('phone_number', models.CharField(max_length=12)),
            ],
        ),
        migrations.AlterField(
            model_name='church',
            name='subscribers',
            field=models.ManyToManyField(blank=True, related_name='subscribers', to='churches.Subscriber'),
        ),
    ]