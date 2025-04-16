from aws_cdk import (
    Stack,
    aws_lambda as _lambda,
    aws_apigateway as apigw,
    aws_iam as iam,
    Duration,
)
from constructs import Construct

class WhispererBackend(Stack):
    def __init__(self, scope: Construct, construct_id: str, **kwargs) -> None:
        super().__init__(scope, construct_id, **kwargs)

        # Create IAM role for Lambda
        lambda_role = iam.Role(
            self, "LambdaRole",
            assumed_by=iam.ServicePrincipal("lambda.amazonaws.com"),
            managed_policies=[
                iam.ManagedPolicy.from_aws_managed_policy_name("service-role/AWSLambdaBasicExecutionRole")
            ]
        )

        # Add specific Bedrock permissions
        lambda_role.add_to_policy(
            iam.PolicyStatement(
                actions=["bedrock:InvokeModel"],
                resources=["*"],
                effect=iam.Effect.ALLOW
            )
        )

        # Create Lambda function
        bedrock_lambda = _lambda.Function(
            self, "BedrockHandler",
            runtime=_lambda.Runtime.PYTHON_3_9,
            handler="handler.lambda_handler",
            code=_lambda.Code.from_asset("lambda"),
            role=lambda_role,
            timeout=Duration.seconds(30),
            environment={
                "BEDROCK_REGION": "us-east-1"  # Update this to your preferred region
            }
        )

        # Create API Gateway
        api = apigw.RestApi(
            self, "BedrockApi",
            rest_api_name="Bedrock Service API",
            description="API for Bedrock integration"
        )

        # Create API Gateway integration with Lambda
        bedrock_integration = apigw.LambdaIntegration(
            bedrock_lambda,
            request_templates={"application/json": '{ "statusCode": "200" }'}
        )

        # Add resource and method to API Gateway
        bedrock_resource = api.root.add_resource("bedrock")
        bedrock_resource.add_method(
            "POST",
            bedrock_integration,
            method_responses=[
                apigw.MethodResponse(
                    status_code="200",
                    response_parameters={
                        "method.response.header.Access-Control-Allow-Origin": True
                    }
                )
            ]
        )

        # Add CORS support
        bedrock_resource.add_cors_preflight(
            allow_origins=apigw.Cors.ALL_ORIGINS,
            allow_methods=["POST"],
            allow_headers=apigw.Cors.DEFAULT_HEADERS
        ) 