import React from 'react';
import {
  Container,
  Header,
  Navbar,
  Content,
  FlexboxGrid,
  Panel,
  Footer,
  Form,
  FormGroup,
  ControlLabel,
  FormControl,
  ButtonToolbar,
  Button
} from 'rsuite';
import { browserHistory } from 'react-router';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        gistId: '75f3b2ec23c7f69594ca3d9e8b7ea81d' // 默认的 gistId，用于演示
      }
    };
  }

  handleFormChange = value => {
    this.setState({
      formData: value
    });
  };
  handleCommit = () => {
    const { formData } = this.state;

    localStorage.setItem('gistId', formData.gistId);
    browserHistory.push('/');
  };
  render() {
    const { formData } = this.state;
    return (
      <div className="login-page">
        <Container>
          <Header>
            <Navbar>
              <Navbar.Header>
                <img src="/logo.png" alt="wakatime dashboard" />
              </Navbar.Header>
            </Navbar>
          </Header>
          <Content>
            <Panel
              className="login-form"
              header={<h3>Input your Wakatime sync gistId</h3>}
              bordered
            >
              <Form formValue={formData} onChange={this.handleFormChange}>
                <FormGroup>
                  <ControlLabel>gistId</ControlLabel>
                  <FormControl name="gistId" type="password"/>
                </FormGroup>
                <ButtonToolbar>
                  <Button
                    appearance="primary"
                    disabled={!formData.gistId}
                    onClick={this.handleCommit}
                  >
                    Submit
                  </Button>
                  <Button appearance="link">How to get gistId?</Button>
                </ButtonToolbar>
              </Form>
            </Panel>
          </Content>
        </Container>
      </div>
    );
  }
}

export default Login;
