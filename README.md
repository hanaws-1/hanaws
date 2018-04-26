# hanaws

Example project for a simple multi target app.

Consists of a db module, a java module exposing db artifacts by Odata and a UI5 web module.
The model is intentionally very simple, but the app is functional.

Please adhere to the steps described in https://help.sap.com/viewer/4505d0bdaf4948449b7f7379d24d0f0d/2.0.02/en-US/e09f5225d61b40bb8761c756f138f2b0.html

In particular, in addition to deploying this app you must:
* create a uaa service instance  as described in step 10 of the above link
* create a role and a role template (step 11b)
* assign the role to the role collection of any user who needs to use the app, in particular the dev who's testing it
