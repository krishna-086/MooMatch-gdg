import pandas as pd
import numpy as np
import joblib
import os
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix
from sklearn.model_selection import RandomizedSearchCV, StratifiedKFold
from sklearn.feature_selection import VarianceThreshold
from imblearn.over_sampling import SMOTE
import matplotlib.pyplot as plt
import seaborn as sns

os.environ['OMP_NUM_THREADS'] = '2'
train_df = pd.read_csv("train.csv")
test_df = pd.read_csv("test.csv")

X_train = train_df.drop(columns=["prognosis"])
y_train = train_df["prognosis"]
X_test = test_df.drop(columns=["prognosis"])
y_test = test_df["prognosis"]

vt = VarianceThreshold(threshold=0.01)
X_train = vt.fit_transform(X_train)
X_test = vt.transform(X_test)
selected_features = vt.get_feature_names_out()

smote = SMOTE(random_state=42)
X_train_resampled, y_train_resampled = smote.fit_resample(X_train, y_train)

param_grid = {
    "n_estimators": [100, 150, 200],
    "max_depth": [10, 20, None],
    "min_samples_split": [2, 5, 10],
}

rf = RandomForestClassifier(random_state=42)

random_search = RandomizedSearchCV(
    estimator=rf,
    param_distributions=param_grid,
    n_iter=10,
    scoring='accuracy',
    cv=StratifiedKFold(n_splits=3),
    verbose=2,
    random_state=42,
    n_jobs=-1
)

random_search.fit(X_train_resampled, y_train_resampled)
best_model = random_search.best_estimator_

y_pred = best_model.predict(X_test)

print("\n Accuracy on Test Set:", accuracy_score(y_test, y_pred))
print("\n Classification Report:\n", classification_report(y_test, y_pred))
print("Best Hyperparameters:", random_search.best_params_)


best_model.selected_features = selected_features.tolist()
joblib.dump(best_model, "cow_disease_model.pkl")
print("\n Model saved as 'cow_disease_model.pkl'")


cm = confusion_matrix(y_test, y_pred, labels=best_model.classes_)
plt.figure(figsize=(12, 10))
sns.heatmap(cm, annot=True, fmt='d', xticklabels=best_model.classes_, yticklabels=best_model.classes_, cmap="Blues")
plt.title("Confusion Matrix")
plt.xlabel("Predicted")
plt.ylabel("True")
plt.show()


importances = best_model.feature_importances_
top_indices = np.argsort(importances)[-10:]
plt.figure(figsize=(8, 6))
plt.barh(range(len(top_indices)), importances[top_indices])
plt.yticks(range(len(top_indices)), [selected_features[i] for i in top_indices])
plt.xlabel("Importance")
plt.title("Top 10 Important Features")
plt.tight_layout()
plt.show()


plt.figure(figsize=(12, 4))
plt.subplot(1, 2, 1)
y_train.value_counts().plot(kind='bar', title='Train Class Distribution')
plt.subplot(1, 2, 2)
y_test.value_counts().plot(kind='bar', title='Test Class Distribution')
plt.tight_layout()
plt.show()
