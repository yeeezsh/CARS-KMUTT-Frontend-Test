import React, { useEffect } from 'react';
import { Form, Row, Col, Checkbox } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

import Outline from 'Components/Outline';
import BreakingLine from 'Components/BreakingLine';
import Button from 'Components/Button';
import Trail from 'Pages/Areas/Common/common/Trail';

// interfaces
import { RequestorForm } from './requestor';
import { ProjectForm } from './project';
import { FacilityForm } from './facility';

// store & dara
import { END_POINT } from 'Models/axios.interface';
import { RootReducers } from 'Store/reducers';
import { AreaInfo } from 'Store/reducers/areaForm/types';
import {
  finishFormAction,
  fillForm,
  setFormCurrentIndex,
} from 'Store/reducers/areaForm/actions';

interface Props {
  ind?: number;
  data?: {
    forms: any;
    area: AreaInfo;
  };
  viewOnly?: boolean;
}

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
const OverviewCommonForm: React.FC<FormComponentProps & Props> = props => {
  console.log('overview common props data', props.data);
  const CUR_IND = props.ind || 3;
  const { validateFields } = props.form;
  const dispatch = useDispatch();
  const { forms, area } =
    props.data || useSelector((s: RootReducers) => s.AreaFormReducers);
  const requestorData: RequestorForm | undefined = forms[0];
  const projectData: ProjectForm | undefined = forms[1];
  const facilityData: FacilityForm | undefined = forms[2];

  //   set index when form is loaded
  useEffect(() => {
    if (props.viewOnly) return; // prevent when viewOnly
    dispatch(setFormCurrentIndex(CUR_IND));
  }, []);

  function onSubmit() {
    validateFields((err, values) => {
      dispatch(fillForm({ form: values, valid: false }));
      if (!err) {
        dispatch(fillForm({ form: values, valid: true }));
        dispatch(finishFormAction());
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
          border: props.viewOnly ? '' : '1px solid #1890FF',
          padding: '0px 16px 16px 16px',
        }}
        span={24}
      >
        {!props.viewOnly && (
          <Outline style={{ color: '#1890FF', paddingTop: '25px' }}>
            ข้อมูลการจอง
          </Outline>
        )}
        {/* overview section */}
        <CustomLabel>สถานที่</CustomLabel>
        <CustomParagraph>{area?.label}</CustomParagraph>
        <CustomLabel>วันที่จอง</CustomLabel>
        <CustomParagraph>
          {/* start date */}
          ตั้งแต่{' '}
          {projectData &&
            projectData.projectStartDate &&
            moment(projectData.projectStartDate).format('DD')}{' '}
          {projectData &&
            projectData.projectStartDate &&
            moment(projectData.projectStartDate).format('MMMM')}{' '}
          {projectData &&
            projectData.projectStartDate &&
            moment(projectData.projectStartDate).format('YYYY')}
          ,{' '}
          {projectData &&
            projectData.projectStartTime &&
            moment(projectData.projectStartTime).format('HH.mm')}{' '}
          น. <br />
          {projectData &&
          !projectData.projectStopDate && // when not have stop date show end time here
            projectData.projectStopTime &&
            ' ถึง ' +
              moment(projectData.projectStopTime).format('HH.mm')}{' '}
          น. <br />
          {/* stop date */}
          {projectData && projectData.projectStopDate && (
            <React.Fragment>
              ถึง{' '}
              {projectData &&
                projectData.projectStopDate &&
                moment(projectData.projectStopDate).format('DD')}{' '}
              {projectData &&
                projectData.projectStopDate &&
                moment(projectData.projectStopDate).format('MMMM')}{' '}
              {projectData &&
                projectData.projectStopDate &&
                moment(projectData.projectStopDate).format('YYYY')}
              ,{' '}
              {projectData &&
                projectData.projectStopTime &&
                moment(projectData.projectStopTime).format('HH.mm')}{' '}
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
                  moment(facilityData?.startAirTime).format('HH.mm')}{' '}
                ถึงเวลา{' '}
                {facilityData &&
                  moment(facilityData?.stopAirTime).format('HH.mm')}{' '}
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
                  moment(facilityData.startSoundTime).format('HH.mm')}{' '}
                ถึงเวลา{' '}
                {facilityData &&
                  moment(facilityData.stopSoundTime).format('HH.mm')}{' '}
                น.
              </p>
            )}
          </Checkbox>
        </div>

        <Trail size={25} />
        {/* action */}
        {!props.viewOnly && (
          <Col span={24}>
            <Row type="flex" justify="center">
              <Col span={22}>
                <Button type="confirm" onClick={onSubmit}>
                  ยืนยันข้อมูลการจอง
                </Button>
              </Col>
            </Row>
          </Col>
        )}
        {/* <Trail /> */}
        <Row style={{ height: '125px' }} />
      </Col>
    </React.Fragment>
  );
};

export default Form.create<FormComponentProps & Props>({
  name: 'overview-common',
})(OverviewCommonForm);
