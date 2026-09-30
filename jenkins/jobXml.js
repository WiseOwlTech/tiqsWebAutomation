const { escapeXml } = require('./xml');
const { parametersXml } = require('./parameters');

function jobXml({ description, gitUrl, gitCredentialsId, branch, scriptPath }) {
  return `<?xml version='1.0' encoding='UTF-8'?>
<flow-definition plugin="workflow-job">
  <description>${escapeXml(description)}</description>
  <keepDependencies>false</keepDependencies>
  <properties>${parametersXml()}
  </properties>
  <definition class="org.jenkinsci.plugins.workflow.cps.CpsScmFlowDefinition" plugin="workflow-cps">
    <scm class="hudson.plugins.git.GitSCM" plugin="git">
      <configVersion>2</configVersion>
      <userRemoteConfigs>
        <hudson.plugins.git.UserRemoteConfig>
          <url>${escapeXml(gitUrl)}</url>
          <credentialsId>${escapeXml(gitCredentialsId)}</credentialsId>
        </hudson.plugins.git.UserRemoteConfig>
      </userRemoteConfigs>
      <branches>
        <hudson.plugins.git.BranchSpec>
          <name>*/${escapeXml(branch)}</name>
        </hudson.plugins.git.BranchSpec>
      </branches>
      <doGenerateSubmoduleConfigurations>false</doGenerateSubmoduleConfigurations>
      <submoduleCfg class="empty-list"/>
      <extensions/>
    </scm>
    <scriptPath>${escapeXml(scriptPath)}</scriptPath>
    <lightweight>true</lightweight>
  </definition>
  <triggers/>
  <disabled>false</disabled>
</flow-definition>
`;
}

module.exports = { jobXml };
