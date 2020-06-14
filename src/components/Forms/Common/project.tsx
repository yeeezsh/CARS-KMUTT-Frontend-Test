import React, { useEffect, useState } from 'react';
import Form, { FormComponentProps } from 'antd/lib/form';
import { Moment } from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import {
  Input,
  Row,
  Radio,
  DatePicker,
  Col,
  TimePicker,
  Upload,
} from 'antd';
import { RadioChangeEvent } from 'antd/lib/radio';
import {
  RcCustomRequestOptions,
  UploadFile,
} from 'antd/lib/upload/interface';

import Badge from 'Components/Badge';
import FormLabel from 'Components/FormLabel';
import Button from 'Components/Button';

// styles
import labelStyles from './styles/label';

// utils
import calendarCurrent from 'Utils/calendar.current';

// store & data
import { RootReducersType } from 'Store/reducers';
import i, { END_POINT } from 'Models/axios.interface';
import { DEFAULT_REQUIRED_RULES } from './rules/required';
import {
  setFormCurrentIndex,
  fillForm,
  submitForm,
} from 'Store/reducers/areaForm/actions';

type DateType = 'oneday' | 'range';
export interface ProjectForm {
  projectName: string;
  dateType: DateType;
  startDate: Moment;
  stopDate: Moment;
  projectDate: Moment;
  projectStartDate: Moment;
  projectStopDate?: Moment;
  projectStartTime: Moment;
  projectStopTime: Moment;
  advisor: string;
  files: Array<UploadFile>;
}

// constant
const PLACEHOLDER_DATE = 'DD/MM/YYYY';
const DATE_FORMAT = 'DD/MM/YYYY';
const PLACEHOLDER_TIME = '00:00';
const UPLOAD_URL = END_POINT + '/file';
const DOWNLOAD_URL = END_POINT + '/file';

const ProjectForm: React.FC<FormComponentProps & {
  ind?: number;
}> = props => {
  const CUR_IND = props.ind || 1;
  const { getFieldDecorator, validateFields } = props.form;
  const dispatch = useDispatch();
  const { forms } = useSelector(
    (s: RootReducersType) => s.AreaFormReducers,
  );
  const data: ProjectForm = forms[CUR_IND];

  const [selectRange, setSelectRange] = useState(
    data.dateType ? (data.dateType === 'range' ? true : false) : true,
  );

  //   set index when form is loaded
  useEffect(() => {
    dispatch(setFormCurrentIndex(CUR_IND));
  }, []);

  function onSubmit() {
    validateFields((err, values) => {
      dispatch(fillForm({ form: values, valid: false }));
      if (!err) {
        dispatch(fillForm({ form: values, valid: true }));
        dispatch(submitForm());
      }
    });
  }

  function onDateType(e: RadioChangeEvent) {
    const select: DateType = e.target.value;
    if (select === 'range') return setSelectRange(true);
    setSelectRange(false);
  }

  function customRequestUpload(options: RcCustomRequestOptions) {
    const data = new FormData();
    data.append('file', options.file);
    const config = {
      headers: {
        'content-type':
          'multipart/form-data; boundary=----WebKitFormBoundaryqTqJIxvkWFYqvP5s',
      },
    };
    i.instance
      .post(options.action, data, config)
      .then((res: any) => {
        options.onSuccess(res.data, options.file);
      })
      .catch((err: Error) => {
        console.log(err);
      });

    return;
  }

  function normFile(e: any) {
    console.log('norm file', e);
    return e && e.fileList;
  }

  return (
    <React.Fragment>
      <FormLabel step={CUR_IND + 1}>รายละเอียดโครงการ</FormLabel>

      {/* name id */}
      <Form.Item>
        <span style={labelStyles}>ชื่อโครงการ</span>
        {getFieldDecorator('projectName', {
          rules: [DEFAULT_REQUIRED_RULES],
          initialValue: data.projectName || '',
        })(<Input placeholder="ชื่อโครงการ" />)}
      </Form.Item>

      {/* date type */}
      <Form.Item>
        <p style={labelStyles}>วันที่จัดโครงการ</p>
        <div style={{ marginLeft: '25%' }}>
          {getFieldDecorator('dateType', {
            rules: [DEFAULT_REQUIRED_RULES],
            initialValue: data.dateType || 'range',
          })(
            <Radio.Group onChange={onDateType}>
              <Radio value="oneday">วันเดียว</Radio>
              <Radio style={{ paddingLeft: 50 }} value="range">
                ระบุช่วง
              </Radio>
            </Radio.Group>,
          )}
        </div>
      </Form.Item>

      {/* DATE RANGE SELECTOR  */}
      {selectRange && (
        <Row type="flex" justify="center">
          {/* START */}
          <Col span={12}>
            <Form.Item>
              <span style={labelStyles}>ตั้งแต่วันที่</span>
              {getFieldDecorator('projectStartDate', {
                rules: [DEFAULT_REQUIRED_RULES],
                initialValue: data.projectStartDate || null,
              })(
                <DatePicker
                  format={[DATE_FORMAT]}
                  placeholder={PLACEHOLDER_DATE}
                  disabledDate={calendarCurrent(0)}
                />,
              )}
            </Form.Item>
          </Col>

          {/* STOP */}
          <Col span={12}>
            <Form.Item>
              <span style={labelStyles}>ถึงวันที่</span>
              {getFieldDecorator('projectStopDate', {
                rules: [DEFAULT_REQUIRED_RULES],
                initialValue: data.projectStopDate || null,
              })(
                <DatePicker
                  format={[DATE_FORMAT]}
                  placeholder={PLACEHOLDER_DATE}
                  disabledDate={calendarCurrent(0)}
                />,
              )}
            </Form.Item>
          </Col>
        </Row>
      )}

      {/* ONE DATE SELECTOR */}
      {!selectRange && (
        <Row type="flex" justify="center">
          {/* START */}
          <Col span={24}>
            <Form.Item>
              <span style={labelStyles}>วันที่</span>
              {getFieldDecorator('projectStartDate', {
                rules: [DEFAULT_REQUIRED_RULES],
                initialValue: data.projectStartDate || null,
              })(
                <DatePicker
                  format={[DATE_FORMAT]}
                  placeholder={PLACEHOLDER_DATE}
                  disabledDate={calendarCurrent(0)}
                />,
              )}
            </Form.Item>
          </Col>
        </Row>
      )}

      {/* TIME SELECTOR  */}
      <Row type="flex" justify="center">
        {/* START */}
        <Col span={12}>
          <Form.Item>
            <span style={labelStyles}>ตั้งแต่เวลา</span>
            {getFieldDecorator('projectStartTime', {
              rules: [DEFAULT_REQUIRED_RULES],
              initialValue: data.projectStartTime || null,
            })(
              <TimePicker
                format={'HH:mm'}
                placeholder={PLACEHOLDER_TIME}
              />,
            )}
          </Form.Item>
        </Col>

        {/* STOP */}
        <Col span={12}>
          <Form.Item>
            <span style={labelStyles}>ถึงเวลา</span>
            {getFieldDecorator('projectStopTime', {
              rules: [DEFAULT_REQUIRED_RULES],
              initialValue: data.projectStopTime || null,
            })(
              <TimePicker
                format={'HH:mm'}
                placeholder={PLACEHOLDER_TIME}
              />,
            )}
          </Form.Item>
        </Col>
      </Row>

      {/* consult name */}
      <Form.Item>
        <span style={labelStyles}>อาจารย์ที่ปรึกษาโครงการ</span>
        {getFieldDecorator('advisor', {
          rules: [DEFAULT_REQUIRED_RULES],
          initialValue: data.advisor || '',
        })(<Input placeholder="ชื่อ - นามสกุล" />)}
      </Form.Item>

      {/* upload*/}
      <Form.Item>
        <span style={labelStyles}>
          อัพโหลดไฟล์โครงการ (*.pdf เท่านั้น)
        </span>
        {getFieldDecorator('files', {
          rules: [DEFAULT_REQUIRED_RULES],
          getValueFromEvent: normFile,
          initialValue: data.files || [],
          valuePropName: 'fileList',
        })(
          <Upload
            name="logo"
            action={UPLOAD_URL}
            customRequest={customRequestUpload}
            multiple={false}
            onDownload={file =>
              window.open(DOWNLOAD_URL + '/' + file.response.id)
            }
          >
            <Badge
              style={{
                fontWeight: 'normal',
                fontSize: '16',
                cursor: 'pointer',
              }}
            >
              เลือกไฟล์
            </Badge>
          </Upload>,
        )}
      </Form.Item>

      {/* action */}
      <Col span={24}>
        <Row type="flex" justify="center">
          <Col span={22}>
            <Button onClick={onSubmit}>ต่อไป</Button>
          </Col>
        </Row>
      </Col>
    </React.Fragment>
  );
};

export default Form.create<
  FormComponentProps & {
    ind?: number;
  }
>({ name: 'project' })(ProjectForm);
