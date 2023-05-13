from django.shortcuts import render
from django.http import HttpResponse
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn import metrics
from sklearn.linear_model import LinearRegression
import seaborn as sns
import matplotlib.pyplot as plt
import io
import urllib, base64
from sklearn.tree import DecisionTreeRegressor 
from sklearn.ensemble import RandomForestRegressor
from sklearn.neighbors import KNeighborsRegressor
import seaborn as sns
import matplotlib.pyplot as plt

def prediction_view(request):
    # Load the data
    admission_df = pd.read_csv('C:/Users/DELL/Downloads/Data.csv', index_col=0)

    # Split the data into training and testing datasets
    X = admission_df.drop(['Chance of Admit '], axis=1)
    y = admission_df['Chance of Admit ']
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    # Create a linear regression object and fit the model
    lr = LinearRegression()
    lr.fit(X_train, y_train)
    pred1 = lr.predict(X_test)

    # Generate scatter plot of actual vs predicted values for Linear Regression
    fig, ax = plt.subplots()
    ax.scatter(y_test, pred1)
    ax.set_xlabel('Actual')
    ax.set_ylabel('Predicted')
    ax.set_title('Linear Regression')

    # Encode the plot image in base64 to display on the web page
    buffer = io.BytesIO()
    fig.savefig(buffer, format='png')
    buffer.seek(0)
    image_png = buffer.getvalue()
    buffer.close()
    graphic = base64.b64encode(image_png).decode('utf-8')

    # Regression Score of the Linear Regression model
    scores = []
    scores.append(('Linear Regression', lr.score(X_test,y_test), metrics.mean_absolute_error(y_test, pred1), metrics.mean_squared_error(y_test, pred1), np.sqrt(metrics.mean_squared_error(y_test, pred1))))

    # Create a dictionary to pass to the template
    context = {'scores': scores, 'graphic': graphic}

    # Render the template
    return render(request, 'linear_regression.html', context)

def prediction_view2(request):
    # Load the data
    admission_df = pd.read_csv('C:/Users/DELL/Downloads/Data.csv', index_col=0)

    # Split the data into training and testing datasets
    X = admission_df.drop(['Chance of Admit '], axis=1)
    y = admission_df['Chance of Admit ']
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    # Create a linear regression object and fit the model
    lr = LinearRegression()
    lr.fit(X_train, y_train)
    pred1 = lr.predict(X_test)

    # Create a decision tree regressor object and fit the model
    DTR = DecisionTreeRegressor() 
    DTR.fit(X_train, y_train)
    pred2 = DTR.predict(X_test)

    # Create a random forest regressor object and fit the model
    RFreg = RandomForestRegressor(n_estimators = 100)
    RFreg.fit(X_train, y_train) 
    pred3 = RFreg.predict(X_test)

    # Create a KNN regressor object with initial value of n =2 and fit the model
    KNneigh = KNeighborsRegressor(n_neighbors=2)
    KNneigh.fit(X_train, y_train)
    pred4 = KNneigh.predict(X_test)
    # Generate scatter plot of actual vs predicted values for Linear Regression
    plt.scatter(y_test, pred1)
    plt.xlabel('Actual')
    plt.ylabel('Predicted')
    plt.title('Random Forest Regression')
    # Encode the plot image in base64 to display on the web page
    buffer = io.BytesIO()
    plt.savefig(buffer, format='png')
    buffer.seek(0)
    image_png = buffer.getvalue()
    buffer.close()
    graphic = base64.b64encode(image_png).decode('utf-8')


    # Regression Score of the models
    scores = []
    scores.append(('Random Forest Regression', RFreg.score(X_test,y_test), metrics.mean_absolute_error(y_test, pred3), metrics.mean_squared_error(y_test, pred3), np.sqrt(metrics.mean_squared_error(y_test, pred3))))


    # Create a dictionary to pass to the template
    context = {'scores': scores, 'graphic': graphic}

    # Render the template
    return render(request, 'random_forest_regression.html', context)
def prediction_view3(request):
    # Load the data
    admission_df = pd.read_csv('C:/Users/DELL/Downloads/Data.csv', index_col=0)

    # Split the data into training and testing datasets
    # Split the data into training and testing datasets
    X = admission_df.drop(['Chance of Admit '], axis=1)
    y = admission_df['Chance of Admit ']
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    # Create a linear regression object and fit the model
    lr = LinearRegression()
    lr.fit(X_train, y_train)
    pred1 = lr.predict(X_test)

    # Create a decision tree regressor object and fit the model
    DTR = DecisionTreeRegressor() 
    DTR.fit(X_train, y_train)
    pred2 = DTR.predict(X_test)

    # Generate scatter plot of actual vs predicted values for Decision tree regressor
    plt.scatter(y_test, pred2)
    plt.xlabel('Actual Chance of Admit')
    plt.ylabel('Predicted Chance of Admit')
    plt.title('Decision Tree Regressor')
    plt.tight_layout()

    # Encode the plot image in base64 format
    buffer = io.BytesIO()
    plt.savefig(buffer, format='png')
    buffer.seek(0)
    image_png = buffer.getvalue()
    buffer.close()
    graphic = base64.b64encode(image_png)
    graphic = graphic.decode('utf-8')
    scores=[]
    scores.append(('Decision Tree Regression', DTR.score(X_test,y_test), metrics.mean_absolute_error(y_test, pred2), metrics.mean_squared_error(y_test, pred2), np.sqrt(metrics.mean_squared_error(y_test, pred2))))

    # Create a dictionary to pass to the template
    context = {'scores': scores, 'graphic': graphic}

    # Render the template
    return render(request, 'tree.html', context)
def prediction_view4(request):
    # Load the data
    admission_df = pd.read_csv('C:/Users/DELL/Downloads/Data.csv', index_col=0)

    # Split the data into training and testing datasets
    X = admission_df.drop(['Chance of Admit '], axis=1)
    y = admission_df['Chance of Admit ']
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    # Create a linear regression object and fit the model
    lr = LinearRegression()
    lr.fit(X_train, y_train)
    pred1 = lr.predict(X_test)

    # Create a decision tree regressor object and fit the model
    DTR = DecisionTreeRegressor() 
    DTR.fit(X_train, y_train)
    pred2 = DTR.predict(X_test)

    # Create a random forest regressor object and fit the model
    RFreg = RandomForestRegressor(n_estimators = 100)
    RFreg.fit(X_train, y_train) 
    pred3 = RFreg.predict(X_test)

    # Create a KNN regressor object with initial value of n =2 and fit the model
    KNneigh = KNeighborsRegressor(n_neighbors=2)
    KNneigh.fit(X_train, y_train)
    pred4 = KNneigh.predict(X_test)
# Generate scatter plot of actual vs predicted values for Decision tree regressor
    plt.scatter(y_test, pred2)
    plt.xlabel('Actual Chance of Admit')
    plt.ylabel('Predicted Chance of Admit')
    plt.title('Decision KNN')
    plt.tight_layout()

    # Encode the plot image in base64 format
    buffer = io.BytesIO()
    plt.savefig(buffer, format='png')
    buffer.seek(0)
    image_png = buffer.getvalue()
    buffer.close()
    graphic = base64.b64encode(image_png)
    graphic = graphic.decode('utf-8')
    # Regression Score of the models
    scores = []
    scores.append(('KNN Regression', KNneigh.score(X_test,y_test), metrics.mean_absolute_error(y_test, pred4), metrics.mean_squared_error(y_test, pred4), np.sqrt(metrics.mean_squared_error(y_test, pred4))))
    context = {'scores': scores, 'graphic': graphic}

    # Render the template
    return render(request, 'knn.html', context)