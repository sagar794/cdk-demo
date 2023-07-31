#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { TestCdkSampleAppStack } from '../lib/test-cdk-sample-app-stack';

const app = new cdk.App();
new TestCdkSampleAppStack(app, 'TestCdkSampleAppStack');
new TestCdkSampleAppStack(app, 'TestCdkSampleAppStack2');
new TestCdkSampleAppStack(app, 'TestCdkSample2');
