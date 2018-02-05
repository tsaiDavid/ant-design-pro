import React, { PureComponent } from 'react';
import { Card, Button, Form, Icon, Col, Row, DatePicker, TimePicker, Input, Select, Popover, Checkbox } from 'antd';
import { connect } from 'dva';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import FooterToolbar from '../../components/FooterToolbar';
// import TableForm from './TableForm';
import styles from './style.less';
import moment from 'moment';

const { Option } = Select;
const { RangePicker } = DatePicker;

// Used by Datepicker to set the format of our date string
const dateFormat = 'MM/DD/YYYY';

const fieldLabels = {
  vitalStatus: 'Vital Status',
  name: 'Name',
  url: 'URL',
  owner: 'Owner',
  approver: 'Approver',
  dateRange: '生效日期',
  type: '仓库类型',
  name2: '任务名',
  url2: '任务描述',
  owner2: '执行人',
  approver2: '责任人',
  dateRange2: '生效日期',
  type2: '任务类型',
  site: 'Site',
  histology: 'Histology',
  pathology: 'Pathologic Stage',
  date: 'Date',
};

class AdvancedForm extends PureComponent {
  state = {
    width: '100%',
  };
  componentDidMount() {
    window.addEventListener('resize', this.resizeFooterToolbar);
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeFooterToolbar);
  }
  resizeFooterToolbar = () => {
    const sider = document.querySelectorAll('.ant-layout-sider')[0];
    const width = `calc(100% - ${sider.style.width})`;
    if (this.state.width !== width) {
      this.setState({ width });
    }
  }
  render() {
    const { form, dispatch, submitting } = this.props;
    const { getFieldDecorator, validateFieldsAndScroll, getFieldsError } = form;
    const validate = () => {
      validateFieldsAndScroll((error, values) => {
        if (!error) {
          // submit the values
          dispatch({
            type: 'form/submitAdvancedForm',
            payload: values,
          });
        }
      });
    };
    const errors = getFieldsError();
    const getErrorInfo = () => {
      const errorCount = Object.keys(errors).filter(key => errors[key]).length;
      if (!errors || errorCount === 0) {
        return null;
      }
      const scrollToField = (fieldKey) => {
        const labelNode = document.querySelector(`label[for="${fieldKey}"]`);
        if (labelNode) {
          labelNode.scrollIntoView(true);
        }
      };
      const errorList = Object.keys(errors).map((key) => {
        if (!errors[key]) {
          return null;
        }
        return (
          <li key={key} className={styles.errorListItem} onClick={() => scrollToField(key)}>
            <Icon type="cross-circle-o" className={styles.errorIcon} />
            <div className={styles.errorMessage}>{errors[key][0]}</div>
            <div className={styles.errorField}>{fieldLabels[key]}</div>
          </li>
        );
      });
      return (
        <span className={styles.errorIcon}>
          <Popover
            title="表单校验信息"
            content={errorList}
            overlayClassName={styles.errorPopover}
            trigger="click"
            getPopupContainer={trigger => trigger.parentNode}
          >
            <Icon type="exclamation-circle" />
          </Popover>
          {errorCount}
        </span>
      );
    };

    return (
      <PageHeaderLayout
        title="Cancer Data Set"
        content="An example set of forms using Ant Design's components. The biomarkers section is currently only implemented with the input as a 'grid'."
        wrapperClassName={styles.advancedForm}
      >
        <Card title="Vital Status" className={styles.card}>
          <Form layout="vertical">
            <Row gutter={16}>
              <Col lg={6} md={12} sm={24}>
                {/* This provides the actual visual label to the field */}
                <Form.Item label={fieldLabels.vitalStatus}>
                  {getFieldDecorator('vitalStatus', {
                    rules: [{ required: true, message: 'Please select a valid status.' }],
                  })(
                    <Select placeholder="Select Status...">
                      <Option value="xiao">Alive</Option>
                      <Option value="mao">Deceased</Option>
                    </Select>
                    )}
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Card>

        <Card title="Primary Diagnosis" className={styles.card} bordered={false}>
          <Form layout="vertical" hideRequiredMark>
            <Row gutter={16}>
              <Col lg={6} md={12} sm={24}>
                <Form.Item label="Diagnosis Date">
                  {getFieldDecorator('name', {
                    rules: [{ required: true, message: 'MM/DD/YYYY' }],
                  })(
                    <DatePicker defaultValue={moment('2015/01/01', dateFormat)} format={dateFormat} />
                  )}
                </Form.Item>
              </Col>
              <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                <Form.Item label={fieldLabels.site}>
                  {getFieldDecorator('site', {
                    rules: [{ required: true, message: 'Please select a site.' }],
                  })(
                    <Select placeholder="Select...">
                      <Option value="option1">Site 1</Option>
                      <Option value="option2">Site 2</Option>
                      <Option value="option3">Site 3</Option>
                      <Option value="option4">Site 4</Option>
                    </Select>
                    )}
                </Form.Item>
              </Col>
              <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                <Form.Item label={fieldLabels.histology}>
                  {getFieldDecorator('histology', {
                    rules: [{ required: true, message: 'Utilize whatever message you want here! #bitcoin' }],
                  })(
                    <Select placeholder="Select...">
                      <Option value="option1">Histology 1</Option>
                      <Option value="option2">Histology 2</Option>
                      <Option value="option3">Histology 3</Option>
                      <Option value="option4">Histology 4</Option>
                    </Select>
                    )}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col lg={6} md={12} sm={24}>
                <Form.Item label={fieldLabels.pathology}>
                  {getFieldDecorator('pathology', {
                    rules: [{ required: true, message: 'See errors by the submit button!' }],
                  })(
                    <Select placeholder="Select...">
                      <Option value="I">Stage I</Option>
                      <Option value="II">Stage II</Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Card>

        <Card title="Biomarkers" className={styles.card} bordered={false}>
          <Form layout="vertical" hideRequiredMark>
            <Row gutter={16}>
              <Col lg={6} md={12} sm={24}>
                <Form.Item label={fieldLabels.date}>
                  {getFieldDecorator('date', {
                    rules: [{ required: true, message: 'Input a valid date: MM/DD/YYYY' }],
                  })(
                    <DatePicker defaultValue={moment('2015/01/01', dateFormat)} format={dateFormat} />
                    )}
                </Form.Item>
              </Col>
            </Row>
            <Checkbox.Group style={{ width: '100%' }}>
              <Row>
                <Col span={6}><Checkbox value="0">PD-1 Expression</Checkbox></Col>
                <Col span={6}><Checkbox value="1">KRAS Wildtype</Checkbox></Col>
                <Col span={6}><Checkbox value="2">NRAS Wildtype</Checkbox></Col>
                <Col span={6}><Checkbox value="3">ALK Rearrangement</Checkbox></Col>
                <Col span={6}><Checkbox value="4">BCR-ABL Fusion (Philadelphia chromosome)</Checkbox></Col>
                <Col span={6}><Checkbox value="5">BRAF Wildtype</Checkbox></Col>
                <Col span={6}><Checkbox value="6">KIT Mutations</Checkbox></Col>
                <Col span={6}><Checkbox value="7">TPS3 Mutations</Checkbox></Col>
                <Col span={6}><Checkbox value="8">Microsatellite Instability (MSI)</Checkbox></Col>
                <Col span={6}><Checkbox value="9">PTEN Mutations</Checkbox></Col>
                <Col span={6}><Checkbox value="10">MLH1 Expression</Checkbox></Col>
                <Col span={6}><Checkbox value="11">MSH2 Expression</Checkbox></Col>
                <Col span={6}><Checkbox value="12">MSH6 Expression</Checkbox></Col>
                <Col span={6}><Checkbox value="13">PMS2 Expression</Checkbox></Col>
                <Col span={6}><Checkbox value="14">TPS3 Expression</Checkbox></Col>
                <Col span={6}><Checkbox value="15">RET Rearrangement</Checkbox></Col>
                <Col span={6}><Checkbox value="16">MET Mutations</Checkbox></Col>
                <Col span={6}><Checkbox value="17">MET Amplification</Checkbox></Col>
                <Col span={6}><Checkbox value="18">RET Mutations</Checkbox></Col>
                <Col span={6}><Checkbox value="19">KI-67 Expression</Checkbox></Col>
                <Col span={6}><Checkbox value="20">PIK3CA Mutations</Checkbox></Col>
              </Row>
            </Checkbox.Group>
          </Form>
        </Card>

        <FooterToolbar style={{ width: this.state.width }}>
          {getErrorInfo()}
          <Button type="primary" onClick={validate} loading={submitting}>
            Submit
          </Button>
        </FooterToolbar>

      </PageHeaderLayout>
    );
  }
}

export default connect(({ global, loading }) => ({
  collapsed: global.collapsed,
  submitting: loading.effects['form/submitAdvancedForm'],
}))(Form.create()(AdvancedForm));
