import React, { useEffect } from 'react';
import { Form, Row, Col, Checkbox } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { useDispatch, useSelector } from 'react-redux';

import Outline from 'Components/Outline';
import BreakingLine from 'Components/BreakingLine';
import Button from 'Components/Button';

// interfaces
import { RequestorForm } from './requestor';
import { ProjectForm } from './project';
import { FacilityForm } from './facility';

// store & dara
import { END_POINT } from 'Models/axios.interface';
import { RootReducers } from 'Store/reducers';

// custom components
const CustomBrakeLine: React.FC = () => (
  <BreakingLine color="#91D5FF" lineSize={0.25} />
);
const CustomSubHeader: React.FC = props => (
  <Outline style={{ color: '#1890FF', fontSize: '14px', margin: 0 }}>
    {props.children}
  </Outline>
);

const CustomLabel: React.FC = props => (
  <p
    style={{
      color: '#666666',
      fontSize: '14px',
      fontWeight: 'bold',
      margin: 0,
    }}
  >
    {props.children}
  </p>
);

const DownloadBtn: React.FC<{
  onClick?: () => void;
}> = props => (
  <Button
    fontColor="#1890FF"
    fontSize={12}
    style={{
      marginLeft: '50px',
      width: '75px',
      height: '30px',
      padding: 0,
      backgroundColor: '#E6F7FF',
    }}
    onClick={props.onClick}
  >
    ดาวน์โหลด
  </Button>
);

const CustomParagraph: React.FC = props => (
  <p
    style={{
      color: '#666666',
      fontSize: '14px',
      margin: 0,
      marginLeft: '8px',
    }}
  >
    {props.children}
  </p>
);

// constant
const DOWNLOAD_URL = END_POINT + '/file';
const CUR_IND = 3;
const OverviewGeneralForm: React.FC<FormComponentProps & {
  ind?: number;
}> = props => {
  const { validateFields } = props.form;
  const dispatch = useDispatch();
  const formData = useSelector((s: RootReducers) => s.AreaFormReducers);
  const requestorData: RequestorForm | undefined = formData?.forms[0];
  const projectData: ProjectForm | undefined = formData?.forms[1];
  const facilityData: FacilityForm | undefined = formData?.forms[2];

  //   set index when form is loaded
  useEffect(() => {
    dispatch({
      type: 'SET_FORM_CUR',
      payload: { cur: props.ind || CUR_IND },
    });
  }, []);

  function onSubmit() {
    validateFields((err, values) => {
      dispatch({
        type: 'FILL_FORM',
        payload: {
          form: values,
          valid: false,
        },
      });
      if (!err) {
        dispatch({
          type: 'FILL_FORM',
          payload: {
            form: values,
            valid: true,
          },
        });
        dispatch({ type: 'FINISH_FORM' });
      }
    });
  }

  function onDownload(id: string) {
    window.open(DOWNLOAD_URL + '/' + id);
  }

  return (
    <React.Fragment>
      <Col
        style={{
          border: '1px solid #1890FF',
          padding: '0px 16px 16px 16px',
        }}
        span={24}
      >
        <Outline style={{ color: '#1890FF' }}>ข้อมูลการจอง</Outline>
        {/* overview section */}
        <CustomBrakeLine />
        <CustomLabel>สถานที่</CustomLabel>
        <CustomParagraph>
          อาคารพระจอมเกล้าราชานุสรณ์ 190 ปี มจธ. (จัดกิจกรรม)
        </CustomParagraph>
        <CustomLabel>วันที่จอง</CustomLabel>
        <CustomParagraph>
          {/* start date */}
          ตั้งแต่{' '}
          {projectData &&
            projectData.projectStartDate &&
            projectData.projectStartDate.format('DD')}{' '}
          {projectData &&
            projectData.projectStartDate &&
            projectData.projectStartDate.format('MMMM')}{' '}
          {projectData &&
            projectData.projectStartDate &&
            projectData.projectStartDate.format('YYYY')}
          ,{' '}
          {projectData &&
            projectData.projectStartTime &&
            projectData.projectStartTime.format('HH.mm')}{' '}
          น. <br />
          {/* stop date */}
          {projectData && projectData.projectStopDate && (
            <React.Fragment>
              ถึง{' '}
              {projectData &&
                projectData.projectStopDate &&
                projectData.projectStopDate.format('DD')}{' '}
              {projectData &&
                projectData.projectStopDate &&
                projectData.projectStopDate.format('MMMM')}{' '}
              {projectData &&
                projectData.projectStopDate &&
                projectData.projectStopDate.format('YYYY')}
              ,{' '}
              {projectData &&
                projectData.projectStopTime &&
                projectData.projectStopTime.format('HH.mm')}{' '}
              น.
            </React.Fragment>
          )}
        </CustomParagraph>
        <CustomBrakeLine />
        {/* project */}
        <CustomSubHeader>รายละเอียดผู้ขอใช้บริการ</CustomSubHeader>
        <CustomLabel>รหัสนักศึกษา</CustomLabel>
        <CustomParagraph>
          {requestorData && requestorData.requestorId}
        </CustomParagraph>

        <CustomLabel>ชื่อ-นามสกุล</CustomLabel>
        <CustomParagraph>
          {requestorData && requestorData.name}
        </CustomParagraph>

        <CustomLabel>คณะ</CustomLabel>
        <CustomParagraph>
          {requestorData && requestorData.faculty}
        </CustomParagraph>

        <CustomLabel>ภาควิชา</CustomLabel>
        <CustomParagraph>
          {requestorData && requestorData.faculty}
        </CustomParagraph>

        {requestorData && requestorData.studentYear && (
          <React.Fragment>
            <CustomLabel>ชั้นปีที่ </CustomLabel>
            <CustomParagraph>
              {requestorData && requestorData.studentYear}
            </CustomParagraph>
          </React.Fragment>
        )}

        <CustomLabel>โทรศัพท์</CustomLabel>
        <CustomParagraph>
          {requestorData && requestorData.phone}
        </CustomParagraph>
        <CustomBrakeLine />
        {/* requestor */}
        <CustomSubHeader>รายละเอียดการใช้บริการ</CustomSubHeader>
        <CustomLabel>ชื่อโครงการ</CustomLabel>
        <CustomParagraph>
          {projectData && projectData.projectName}
        </CustomParagraph>
        <CustomLabel>ไฟล์โครงการที่แนบมาด้วย</CustomLabel>
        <CustomParagraph>
          {projectData &&
            projectData.files &&
            projectData.files.map(e => (
              <React.Fragment key={e.uid}>
                {e.name}{' '}
                <DownloadBtn onClick={() => onDownload(e.response.id)} />
              </React.Fragment>
            ))}
        </CustomParagraph>

        <CustomLabel>อาจารย์ที่ปรึกษา</CustomLabel>
        <CustomParagraph>
          {projectData && projectData.advisor}
        </CustomParagraph>

        <CustomBrakeLine />
        {/* facility */}
        <CustomSubHeader>
          เครื่องปรับอากาศและเครื่องขยายเสียง
        </CustomSubHeader>

        <div>
          <Checkbox
            checked={(facilityData && facilityData.airRequired) || false}
            disabled={facilityData && !facilityData.airRequired}
          >
            <b>เครื่องปรับอากาศ</b>
            {facilityData && facilityData.airRequired && (
              <p>
                ตั้งแต่เวลา{' '}
                {facilityData &&
                  facilityData.startAirTime?.format('HH.mm')}{' '}
                ถึงเวลา{' '}
                {facilityData && facilityData.stopAirTime?.format('HH.mm')}{' '}
                น.
              </p>
            )}
          </Checkbox>
        </div>

        <div>
          <Checkbox
            checked={(facilityData && facilityData.soundRequired) || false}
            disabled={facilityData && !facilityData.soundRequired}
          >
            <b>เครื่องขยายเสียง</b>
            {facilityData && facilityData.soundRequired && (
              <p>
                ตั้งแต่เวลา{' '}
                {facilityData &&
                  facilityData.startSoundTime?.format('HH.mm')}{' '}
                ถึงเวลา{' '}
                {facilityData &&
                  facilityData.startSoundTime?.format('HH.mm')}{' '}
                น.
              </p>
            )}
          </Checkbox>
        </div>

        <CustomBrakeLine />
        {/* action */}
        <Col span={24}>
          <Row type="flex" justify="center">
            <Col span={22}>
              <Button type="confirm" onClick={onSubmit}>
                ยืนยันข้อมูลการจอง
              </Button>
            </Col>
          </Row>
        </Col>
      </Col>
    </React.Fragment>
  );
};

export default Form.create({ name: 'requestor' })(OverviewGeneralForm);
