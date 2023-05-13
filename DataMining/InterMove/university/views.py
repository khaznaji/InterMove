from django.shortcuts import render
import pandas as pd
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import MinMaxScaler
from sklearn.ensemble import RandomForestClassifier
from sklearn.tree import DecisionTreeClassifier
from sklearn.neighbors import KNeighborsClassifier
import matplotlib.pyplot as plt
import io
import base64
from sklearn import metrics
import numpy as np


def logistic_regression(request):
    data=pd.read_csv('C:/Users/DELL/Downloads/spambase_csv.csv')
   
    X=data.iloc[:,:-1]
    y=data.iloc[:,-1]
    scaler = MinMaxScaler(copy=True, feature_range=(0, 1))
    X = scaler.fit_transform(X)
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.33, random_state=44, shuffle =True)
    LogisticRegressionModel = LogisticRegression(penalty='l2',solver='sag',C=1.0,random_state=33)
    LogisticRegressionModel.fit(X_train, y_train)
    train_score = LogisticRegressionModel.score(X_train, y_train)
    test_score = LogisticRegressionModel.score(X_test, y_test)
    classes = LogisticRegressionModel.classes_
    n_iter = LogisticRegressionModel.n_iter_
    
    # Generate the plot
    fig, ax = plt.subplots()
    ax.plot([1,2,3], [4,5,6]) # Replace with your own data
    ax.set_xlabel('X Label')
    ax.set_ylabel('Y Label')
    ax.set_title('Title')
    
    # Convert the plot to a base64 encoded string
    buf = io.BytesIO()
    plt.savefig(buf, format='png')
    buf.seek(0)
    string = base64.b64encode(buf.read()).decode('utf-8')
    plt.close()
    
    context = {
        'train_score': train_score,
        'test_score': test_score,
        'classes': classes,
        'n_iter': n_iter,
        'plot': string, # Include the plot in the context
    }
    return render(request, 'logistic_regression.html', context)

import matplotlib.pyplot as plt
import base64
from io import BytesIO

def random_forest_classifier(request):
    # Load the dataset
    data=pd.read_csv('C:/Users/DELL/Downloads/spambase_csv.csv')
    X=data.iloc[:,:-1]
    y=data.iloc[:,-1]

    # Scale the input features
    scaler = MinMaxScaler(copy=True, feature_range=(0, 1))
    X = scaler.fit_transform(X)

    # Split the dataset into training and testing sets
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.33, random_state=44, shuffle =True)

    # Train the RandomForestClassifier model
    RandomForestClassifierModel = RandomForestClassifier(criterion='gini', n_estimators=100, max_depth=20, random_state=33)
    RandomForestClassifierModel.fit(X_train, y_train)

    # Evaluate the performance of the model
    train_score = RandomForestClassifierModel.score(X_train, y_train)
    test_score = RandomForestClassifierModel.score(X_test, y_test)

    # Generate the performance curve
    n_estimators_range = range(1, 201, 10)
    test_scores = []
    for n_estimators in n_estimators_range:
        model = RandomForestClassifier(criterion='gini', n_estimators=n_estimators, max_depth=20, random_state=33)
        model.fit(X_train, y_train)
        test_scores.append(model.score(X_test, y_test))
    # Convert the performance curve to a base64 string
    fig, ax = plt.subplots()
    ax.plot(n_estimators_range, test_scores)
    ax.set(xlabel='n_estimators', ylabel='Test Score', title='Random Forest Classifier Performance')
    plt.ylim(0.9, 1)
    buffer = BytesIO()
    plt.savefig(buffer, format='png')
    buffer.seek(0)
    image_png = buffer.getvalue()
    buffer.close()
    graphic = base64.b64encode(image_png).decode()

    context = {
        'train_score': train_score,
        'test_score': test_score,
        'graphic': graphic,
    }
    return render(request, 'random_forest_classifier.html', context)





def decision_tree_classifier(request):
    # Load the dataset
    data=pd.read_csv('C:/Users/DELL/Downloads/spambase_csv.csv')
    X=data.iloc[:,:-1]
    y=data.iloc[:,-1]

    # Scale the input features
    scaler = MinMaxScaler(copy=True, feature_range=(0, 1))
    X = scaler.fit_transform(X)

    # Split the dataset into training and testing sets
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.33, random_state=44, shuffle =True)

    # Train the DecisionTreeClassifier model
    DecisionTreeClassifierModel = DecisionTreeClassifier(criterion='gini',max_depth=20,random_state=33) #criterion can be entropy
    DecisionTreeClassifierModel.fit(X_train, y_train)

    # Evaluate the performance of the model
    train_score = DecisionTreeClassifierModel.score(X_train, y_train)
    test_score = DecisionTreeClassifierModel.score(X_test, y_test)
    
    # Create a plot of the model's training and testing accuracy
    plt.plot(['Train', 'Test'], [train_score, test_score])
    plt.xlabel('Dataset')
    plt.ylabel('Accuracy')
    plt.title('Decision Tree Classifier Performance')
    plt.ylim(0, 1)
    plt.savefig('decision_tree_performance.png')

    # Encode the plot image as base64 to include in the response
    with open('decision_tree_performance.png', 'rb') as f:
        img_data = f.read()
    img_b64 = base64.b64encode(img_data).decode('utf-8')

    # Get the feature importances and classes of the model
    feature = DecisionTreeClassifierModel.feature_importances_
    classes = DecisionTreeClassifierModel.classes_

    context = {
        'train_score': train_score,
        'test_score': test_score,
        'img_b64': img_b64,
        'feature': feature,
        'classes': classes
    }
    return render(request, 'decision_tree_classifier.html', context)



def knn_classifier(request):
    # Load the dataset
    data=pd.read_csv('C:/Users/DELL/Downloads/spambase_csv.csv')
    X=data.iloc[:,:-1]
    y=data.iloc[:,-1]

    # Scale the input features
    scaler = MinMaxScaler(copy=True, feature_range=(0, 1))
    X = scaler.fit_transform(X)

    # Split the dataset into training and testing sets
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.33, random_state=44, shuffle =True)

    # Train the KNN Classifier model
    KNNClassifierModel = KNeighborsClassifier(n_neighbors=15,weights ='distance', algorithm='auto')   
    KNNClassifierModel.fit(X_train, y_train)
 
    # Evaluate the performance of the model
    train_score = KNNClassifierModel.score(X_train, y_train)
    test_score = KNNClassifierModel.score(X_test, y_test)

    # Create a plot of the model's training and testing accuracy
    plt.plot(['Train', 'Test'], [train_score, test_score])
    plt.xlabel('Dataset')
    plt.ylabel('Accuracy')
    plt.title('KNN Classifier Performance')
    plt.ylim(0, 1)
    plt.savefig('knn_performance.png')

    # Encode the plot image as base64 to include in the response
    with open('knn_performance.png', 'rb') as f:
        img_data = f.read()
    img_b64 = base64.b64encode(img_data).decode('utf-8')

    context = {
        'train_score': train_score,
        'test_score': test_score,
        'img_b64': img_b64
    }
    return render(request, 'knn_classifier.html', context)

