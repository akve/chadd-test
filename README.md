#Docusign integration.

full test URL (local):
https://account-d.docusign.com/oauth/auth?response_type=code&scope=signature&client_id=OSCM-e1bb8a36-b4b1-45f2-bca5-aa69d86f9073&state=a39fh23hnf23&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fdocusign_auth_callback&#/username

Location of output token:
http://chadd-test-intermediate.s3-website-us-east-1.amazonaws.com/index.json

Call the function ONCE: 

https://aszzua9bm1.execute-api.us-east-1.amazonaws.com/dev

https://account-d.docusign.com/oauth/auth?response_type=code&scope=signature&client_id=OSCM-e1bb8a36-b4b1-45f2-bca5-aa69d86f9073&state=a39fh23hnf23&redirect_uri=https%3A%2F%2Faszzua9bm1.execute-api.us-east-1.amazonaws.com%2Fdev%2Fdocusign_auth_callback&#/username


#Instructions

The service requests one-time OAuth consent screen and then remembers the token and refreshes it every 7 hours. 
The token itself is stored on S3 and available with simple HTTP (made public, without need to use AWS CLI/SDK). 

1. Call ONCE https://account-d.docusign.com/oauth/auth?response_type=code&scope=signature&client_id=OSCM-e1bb8a36-b4b1-45f2-bca5-aa69d86f9073&state=a39fh23hnf23&redirect_uri=https%3A%2F%2Faszzua9bm1.execute-api.us-east-1.amazonaws.com%2Fdev%2Fdocusign_auth_callback&#/username
2. See the actual token at http://chadd-test-intermediate.s3-website-us-east-1.amazonaws.com/index.json
