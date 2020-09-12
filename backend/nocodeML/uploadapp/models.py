from django.db import models

# Create your models here.
class DataSet(models.Model):
    data=models.FileField()

    def __str__(self) :
        return self.data.name
