#!/usr/bin/env python
##-------------------------------------------------------------
##
## Program: athletes_csv_to_mongodb.py
##
## Purpose: 
##          This program will parse a .csv file and insert
##          the records as documents in the target collection
##          'ahtletes' in the target database 'meteor'.
##
## Invocation:
##          python3
##
##
##-------------------------------------------------------------
import pymongo
import csv
import sys
import os.path
import hashlib

## Change this to False in order to actually execute the insert
## into the target MongoDB collection
TEST_MODE = False

## Name of the MongoDB database
database_name = 'meteor'

## Name of the target collection
collection_name = 'athletes'

## This is the MongoDB connection URL
mongodb_url = '127.0.0.1'

## This is the MongoDB port number to connect on
mongodb_port = '3001'


mongodb_connection_url = 'mongodb://' + mongodb_url + ':' + mongodb_port + '/meteor'

## The input data file path
datafile = 'private/MVP_Athletes_Attribute_Rankings.csv'

column_name_lookup = {}

column_name_list  =  ['first_name', 'last_name', 'absolute_strength', 'relative_strength', 'allometric_strength', 'power', 'speed', 'acceleration', 'agility', 'body_composition', 'overall']

def load_column_name_lookup():

    global column_name_lookup

    ctr = 0

    for name in column_name_list:

        column_name_lookup[ctr] = name
        
        ctr += 1

    # print(column_name_lookup)
    # sys.exit(0)

def get_record_list_from_csv_file(datafile):

    record_list = []

    with open(datafile, mode='r') as infile:
    
        reader = csv.reader(infile)
    
        line_ctr = 0
    
        for rows in reader:
    
            line_ctr += 1

            if line_ctr == 1:
                continue

            else:

                row_ctr = 0
        
                json = {}
        
                for row in rows:
    
                    print(row)    

                    json[column_name_lookup[row_ctr]] = row

                    row_ctr += 1


                record_list.append(json)


    return record_list



def insert_records_into_collection(record_list):
    '''
        This function will insert the athlete records as documents
        into the athletes collection.
    '''


    # establish a connection to the database
    try:
        connection = pymongo.MongoClient(mongodb_connection_url)
    except Exception as e:
        print("Unexpected error:", type(e), e)


    # get a handle to the meteor database
    db = connection[database_name]
    
    collection = db[collection_name]

    print("Will insert athlete records as documents into the '%s' collection in database '%s'" % (collection_name, database_name))
    
    record_ctr = 0


    for doc in record_list:

        first_name = doc['first_name']
        
        last_name = doc['last_name']

        name = first_name + last_name

        id = hashlib.md5(name.encode('utf-8')).hexdigest()

        doc['athlete_id'] = id

        record_ctr += 1

        if not TEST_MODE:
            try:
                collection.insert_one(doc)

            except Exception as e:
                print("Unexpected error:", type(e), e)
        else:
            print("Would have inserted document number '%d'" % record_ctr)
            print(doc)

    if TEST_MODE:
        print("Note: We are running in test mode")
        print("Would have inserted '%d' records as documents into collection '%s' in database '%s'" % (record_ctr, collection_name, database_name))

    else:
        print("Inserted '%d' records as documents into collection '%s' in database '%s'" % (record_ctr, collection_name, database_name))

def check_infile_status(datafile):

    if not os.path.exists(datafile):
        print("datafile '%s' does not exist" % datafile)
        sys.exit(1)

    if not os.path.isfile(datafile):
        print("datafile '%s' is not a regular file" % datafile)
        sys.exit(1)

    if os.stat(datafile).st_size == 0:
        print("datafile '%s' is not a regular file" % datafile)
        sys.exit(1)



if __name__ == '__main__':

    check_infile_status(datafile)

    load_column_name_lookup()

    record_list = get_record_list_from_csv_file(datafile)

    insert_records_into_collection(record_list)

    print("Execution completed")

    sys.exit(0)