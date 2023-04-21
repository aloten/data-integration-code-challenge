#!/bin/bash

# set the Kafka bin directory path
KAFKA_BIN_PATH="/path/to/kafka/bin"

# set the Kafka broker list
BROKER_LIST="broker:9092"

# set the topic names
TOPIC1_NAME="pet"
TOPIC2_NAME="product"
TOPIC3_NAME="prescription"

# set the number of partitions
NUM_PARTITIONS=1

# set the replication factor
REPLICATION_FACTOR=1

# create the pet topic
docker-compose exec broker \
  $KAFKA_BIN_PATH/kafka-topics.sh \
  --create \
  --bootstrap-server $BROKER_LIST \
  --topic $TOPIC1_NAME \
  --partitions $NUM_PARTITIONS \
  --replication-factor $REPLICATION_FACTOR

# create the product topic
docker-compose exec broker \
  $KAFKA_BIN_PATH/kafka-topics.sh \
  --create \
  --bootstrap-server $BROKER_LIST \
  --topic $TOPIC1_NAME \
  --partitions $NUM_PARTITIONS \
  --replication-factor $REPLICATION_FACTOR

# create the prescription topic
docker-compose exec broker \
  $KAFKA_BIN_PATH/kafka-topics.sh \
  --create \
  --bootstrap-server $BROKER_LIST \
  --topic $TOPIC1_NAME \
  --partitions $NUM_PARTITIONS \
  --replication-factor $REPLICATION_FACTOR
