FROM python:3.7.3
WORKDIR /app
COPY . .
EXPOSE 5000
ENV FLASK_APP=main.py
RUN pip install -r requirements.txt
CMD [ "flask", "run", "--host=0.0.0.0"]