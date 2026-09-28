# ---- Stage 1: train the model ------------------------------------------------
# Produces cow_disease_model.pkl, which is not committed to the repository.
FROM python:3.12-slim AS trainer

WORKDIR /train

# Agg is a non-interactive matplotlib backend, so the plt.show() calls at the
# end of model.py return immediately instead of blocking the build.
ENV MPLBACKEND=Agg \
    PYTHONDONTWRITEBYTECODE=1

# Copied first so the dependency layer is cached when only the source changes.
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Brings in model.py, train.csv, and test.csv if you have added one.
# model.py falls back to splitting train.csv when test.csv is absent.
COPY . .

RUN python model.py


# ---- Stage 2: serve the API --------------------------------------------------
FROM python:3.12-slim AS runtime

WORKDIR /app

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PORT=8080

# Install runtime dependencies only; the training-only packages
# (imbalanced-learn, matplotlib, seaborn) are not needed to serve predictions.
# Keep these in sync with the runtime block of requirements.txt.
RUN pip install --no-cache-dir \
        "Flask>=3.0" \
        "flask-cors>=4.0" \
        "joblib>=1.3" \
        "pandas>=2.0" \
        "numpy>=1.26" \
        "scikit-learn>=1.5" \
        "gunicorn>=21.2"

COPY app.py .
COPY --from=trainer /train/cow_disease_model.pkl .

# Run as a non-root user.
RUN useradd --create-home --shell /usr/sbin/nologin appuser \
    && chown -R appuser:appuser /app
USER appuser

EXPOSE 8080

# Cloud Run injects PORT; the default above covers local runs.
CMD exec gunicorn --bind "0.0.0.0:${PORT}" --workers 2 --threads 4 --timeout 60 app:app
