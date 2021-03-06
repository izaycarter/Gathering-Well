# Generated by Django 2.2.6 on 2019-10-28 20:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0002_churchprofile'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='churchprofile',
            name='denoimonation',
        ),
        migrations.AddField(
            model_name='churchprofile',
            name='denomination',
            field=models.CharField(choices=[('NON DENOMINATIONAL', 'Non Denominational'), ('CATHOLIC', 'Catholic'), ('ADVENTIST', 'Adventist'), ('ANABAPTIST', 'Anabaptist'), ('ANGLICAN', 'Anglican'), ('BAPTIST', 'Baptist'), ('CALVINIST', 'Calvinist'), ('EVANGELICAL', 'Evangelical'), ('HOLINESS', 'Holiness'), ('LUTHERAN', 'Lutheran'), ('METHODIST', 'Methodist'), ('PENTECOSTAL', 'Pentecostal'), ('ASSYRIAN', 'Assyrian'), ('EASTERN ORTHODOX', 'Eastern Orthodox'), ('ORIENTAL ORTHODOX', 'Oriental Orthodox'), ("JEHOVAH'S WITNESS", "Jehovah's Witness"), ('LATTER DAY SAINT', 'Latter Day Saint')], max_length=255, null=True),
        ),
    ]
