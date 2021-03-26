Firstly, you need to configure you database connection string in file '.src/app.module.ts'  
You need to specify the connection string to cloud mongo database. Connection string includes name of the database, username, cluster address and password.  

# API
## Workers
## GET /api/workers - Get list of all workers

### Request 
Example: GET /api/workers

### Response
Success Code: 200  
Success Response Body = Workers[]  

## GET /api/workers/{worker_id} - Get worker by id

### Request
Example: GET /api/workers/6055378b0dec332f14575159

### Response
Success Code: 200  
Success Response Body = Worker  
Unsuccess Code: 404  
Unsuccess Response Body = Error Message  

## GET /api/workers/{worker_id}/works - Get works where the worker works

### Request
Example: GET /api/workers/6055378b0dec332f14575159/works

### Response
Success Code: 200  
Success Response Body = Works[] and TotalSalary  
Unsuccess Code: 400  
Unsuccess Response Body = Error Message  

## POST /api/workers - Create a new worker

### Request
Body = Worker  
Example: POST /api/workers  
```json
{
    "name": "John"
}
```

### Response
Success Code: 201  
Success Response Body = Created Worker  
Unsuccess Code: 400  
Unsuccess Response Body = Error Message  

## POST /api/workers/{worker_id}/{work_id} - Add a work with id to worker with id

### Request
Example: POST /api/workers/6055378b0dec332f14575159/605536f70dec332f14575158

### Response
Success Code: 200  
Success Response Body = Created Employment record  
Unsuccess Code: 400  
Unsuccess Response Body = Error Message  


## PUT /api/workers/{worker_id} - Update worker by id

### Request
Body = Worker  
Example: PUT /api/workers/6055378b0dec332f14575159  
```json
{
    "name": "John"
}
```

### Response
Success Code: 200  
Success Response Body = Updated Worker  
Unsuccess Code: 400  
Unsuccess Response Body = Error Message  

## PATCH /api/workers/{worker_id} - Partial update worker by id

### Request
Body = Worker  
Example: PATCH /api/workers/6055378b0dec332f14575159  
```json
{
    "name": "John"
}
```

### Response
Success Code: 200  
Success Response Body = Updated Worker  
Unsuccess Code: 400  
Unsuccess Response Body = Error Message  

## DELETE /api/workers/{worker_id} - Delete worker by id

### Request
Example: DELETE /api/workers/6055378b0dec332f14575159

### Response
Success Code: 200  
Success Response Body = Deleted Worker  
Unsuccess Code: 404  
Unsuccess Response Body = Error Message  

## DELETE /api/workers/{worker_id}/{work_id} - Delete work with id from worker with id

### Request
Example: DELETE /api/workers/6055378b0dec332f14575159/605536f70dec332f14575158

### Response
Success Code: 200  
Success Response Body = Deleted Employment record  
Unsuccess Code: 400  
Unsuccess Response Body = Error Message  

## Works
## GET /api/works - Get list of all works

### Request
Example: GET /api/works

### Response
Success Code: 200  
Success Response Body = Works[]  

## GET /api/works/{work_id} - Get work by id

### Request
Example: GET /api/works/605536f70dec332f14575158

### Response
Success Code: 200  
Success Response Body = Work  
Unsuccess Code: 400  
Unsuccess Response Body = Error Message  

## GET /api/works/{work_id}/workers - Get workers who work at work by id

### Request
Example: GET /api/works/605536f70dec332f14575158/workers

### Response
Success Code: 200  
Success Response Body = Workers[], Salary and TotalSalary  
Unsuccess Code: 400  
Unsuccess Response Body = Error Message  

## POST /api/works - Create a new work

### Request
Body = Work  
Example: POST /api/workers  
```json
{
    "name": "John",
    "salary": 500,
    "hoursPerDay": 4
}
```

### Response
Success Code: 201  
Success Response Body = Created Work  
Unsuccess Code: 400  
Unsuccess Response Body = Error Message  

## PUT /api/works/{work_id} - Update work by id

### Request
Body = Work  
Example: PUT /api/works/605536f70dec332f14575158  
```json
{
    "name": "John",
    "salary": 500,
    "hoursPerDay": 4
}
```

### Response
Success Code: 200  
Success Response Body = Updated Work  
Unsuccess Code: 400  
Unsuccess Response Body = Error Message  

## PATCH /api/works/{work_id} - Partial update worker by id

### Request
Body = Work  
Example: PATCH /api/works/605536f70dec332f14575158  
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
Success Response Body = Updated Work  
Unsuccess Code: 400  
Unsuccess Response Body = Error Message  

## DELETE /api/works/{work_id} - Delete work by id

### Request
Example: DELETE /api/works/605536f70dec332f14575158

### Response
Success Code: 200  
Success Response Body = Deleted Work  
Unsuccess Code: 400  
Unsuccess Response Body = Error Message  

## DELETE /api/works/{work_id}/{worker_id} - Delete worker by id from work by id

### Request
Example: DELETE /api/works/605536f70dec332f14575158/6055378b0dec332f14575159

### Response
Success Code: 200  
Success Response Body = Deleted Employment record  
Unsuccess Code: 400  
Unsuccess Response Body = Error Message  