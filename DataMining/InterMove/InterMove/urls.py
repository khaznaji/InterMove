"""InterMove URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from django.urls import path
from predictions.views import prediction_view
from predictions.views import prediction_view2
from predictions.views import prediction_view3
from predictions.views import prediction_view4
from university.views import logistic_regression
from university.views import random_forest_classifier
from university.views import decision_tree_classifier
from university.views import knn_classifier




urlpatterns = [
    path('admin/', admin.site.urls),
    path('predictions/', prediction_view, name='predictions'),
    path('predictions2/', prediction_view2, name='predictions2'),
    path('predictions3/', prediction_view3, name='predictions3'),
    path('predictions4/', prediction_view4, name='predictions4'),
    path('logistic-regression/', logistic_regression, name='logistic_regression'),
    path('random_forest_classifier/', random_forest_classifier, name='random_forest_classifier'),
    path('decision_tree_classifier/', decision_tree_classifier, name='decision_tree_classifier'),
    path('knn_classifier/', knn_classifier, name='knn_classifier'),






]
