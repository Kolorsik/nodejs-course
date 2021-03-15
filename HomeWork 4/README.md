Firstly, you need to configure you database in file './database/sequelize.js'
You need to specify the name of the database, username and password
The request must indicate which version it is: v1 or v2
Examples: /v1/workers/1; /v2/workers
The difference is that v1 is queries written using seqielize objects and methods, while v2 uses raw sql to work with the database.

# API
## Workers
## GET /workers - Get list of all workers

### Request 
Example: GET /workers

### Response
Success Code: 200  
Success Response Body = Workers[]  

## GET /workers/{worker_id} - Get worker by id

### Request
Example: GET /workers/1

### Response
Success Code: 200  
Success Response Body = Worker  
Unsuccess Code: 404  
Unsuccess Response Body = Error Message  

## GET /workers/{worker_id}/works - Get works where the worker works

### Request
Example: GET /workers/1/works

### Response
Success Code: 200  
Success Response Body = Works[] and TotalSalary  
Unsuccess Code: 400  
Unsuccess Response Body = Error Message  

## POST /workers - Create a new worker

### Request
Body = Worker  
Example: POST /workers  
```json
{
    "name": "John"
}
```

### Response
Success Code: 201  
Success Response Body = Success Message and Created Worker  
Unsuccess Code: 400  
Unsuccess Response Body = Error Message  

## POST /workers/{worker_id}/{work_id} - Add a work with id to worker with id

### Request
Example: POST /workers/1/1

### Response
Success Code: 200  
Success Response Body = Success Message  
Unsuccess Code: 400  
Unsuccess Response Body = Error Message  


## PUT /workers/{worker_id} - Update worker by id

### Request
Body = Worker  
Example: PUT /workers/1  
```json
{
    "name": "John"
}
```

### Response
Success Code: 200  
Success Response Body = Success Message and Updated Worker  
Unsuccess Code: 400  
Unsuccess Response Body = Error Message  

## PATCH /workers/{worker_id} - Partial update worker by id

### Request
Body = Worker  
Example: PATCH /workers/1  
```json
{
    "name": "John"
}
```

### Response
Success Code: 200  
Success Response Body = Success Message and Updated Worker  
Unsuccess Code: 400  
Unsuccess Response Body = Error Message  

## DELETE /workers/{worker_id} - Delete worker by id

### Request
Example: DELETE /workers/1

### Response
Success Code: 200  
Success Response Body = Success Message  
Unsuccess Code: 404  
Unsuccess Response Body = Error Message  

## DELETE /workers/{worker_id}/{work_id} - Delete work with id from worker with idWork

### Request
Example: DELETE /workers/1/1

### Response
Success Code: 200  
Success Response Body = Success Message  
Unsuccess Code: 400  
Unsuccess Response Body = Error Message  

## Works
## GET /works - Get list of all works

### Request
Example: GET /works

### Response
Success Code: 200  
Success Response Body = Works[]  

## GET /works/{work_id} - Get work by idWork

### Request
Example: GET /works/1

### Response
Success Code: 200  
Success Response Body = Work  
Unsuccess Code: 400  
Unsuccess Response Body = Error Message  

## GET /works/{work_id}/workers - Get workers who work at work by id

### Request
Example: GET /works/1/Workers

### Response
Success Code: 200  
Success Response Body = Workers[], Salary and TotalSalary  
Unsuccess Code: 400  
Unsuccess Response Body = Error Message  

## POST /works - Create a new work

### Request
Body = Work  
Example: POST /workers  
```json
{
    "name": "John",
    "salary": 500,
    "hoursPerDay": 4
}
```

### Response
Success Code: 201  
Success Response Body = Success Message and Created Work  
Unsuccess Code: 400  
Unsuccess Response Body = Error Message  

## PUT /works/{work_id} - Update work by idWork

### Request
Body = Work  
Example: PUT /works/1  
```json
{
    "name": "John",
    "salary": 500,
    "hoursPerDay": 4
}
```

### Response
Success Code: 200  
Success Response Body = Success Message and Updated Work  
Unsuccess Code: 400  
Unsuccess Response Body = Error Message  

## PATCH /works/{work_id} - Partial update worker by id

### Request
Body = Work  
Example: PATCH /works/1  
(There must be at least one property)  
```json
{
    "name?": "John",
    "salary?": 500,
    "hoursPerDay?": 4
}
```

### Response
Success Code: 200  
Success Response Body = Success Message and Updated Work  
Unsuccess Code: 400  
Unsuccess Response Body = Error Message  

## DELETE /works/{work_id} - Delete work by id

### Request
Example: DELETE /works/1

### Response
Success Code: 200  
Success Response Body = Success Message  
Unsuccess Code: 400  
Unsuccess Response Body = Error Message  

## DELETE /works/{work_id}/{worker_id} - Delete worker by id from work by id

### Request
Example: DELETE /works/1/1

### Response
Success Code: 200  
Success Response Body = Success Message  
Unsuccess Code: 400  
Unsuccess Response Body = Error Message  