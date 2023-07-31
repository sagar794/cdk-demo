mkdir package
pip install -r requirements.txt --target package
cd package
zip -r ../my_deployment_package.zip .
cd ..
zip my_deployment_package.zip app.py
mv my_deployment_package.zip /asset-output

