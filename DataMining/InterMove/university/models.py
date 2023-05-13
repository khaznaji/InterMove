from django.db import models

class SearchTrend(models.Model):
    keyword = models.CharField(max_length=50)
    date = models.DateField()
    value = models.IntegerField()
