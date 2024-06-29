FROM google/cloud-sdk

# Install kubectl
RUN curl -o kubectl https://s3.us-west-2.amazonaws.com/amazon-eks/1.19.6/2021-01-05/bin/linux/amd64/kubectl && \
    chmod +x ./kubectl && \
    cp ./kubectl /bin/kubectl 

# Add your /.kube/config from remote cluster 
COPY config .
# Add your gke service account key
COPY mbay-kubernetes-app-86b54cbda593.json .
COPY cmd.sh .
RUN chmod +x cmd.sh
RUN gcloud auth activate-service-account --key-file=mbay-kubernetes-app-86b54cbda593.json

CMD ["sh","-c","./cmd.sh"]