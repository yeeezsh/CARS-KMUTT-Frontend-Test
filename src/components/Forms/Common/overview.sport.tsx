import { Checkbox, Col, Form, Row } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import BreakingLine from 'Components/BreakingLine';
import Button from 'Components/Button';
import ButtonActionLayout from 'Components/Layout/ButtonActionLayout';
import OverviewBorderLayout from 'Components/Layout/OverviewBorderLayout';
import Outline from 'Components/Outline';
import moment from 'moment';
import Trail from 'Pages/Areas/Common/common/Trail';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// store & dara
import { END_POINT } from 'Services/adapter.interface';
import { RootReducersType } from 'Store/reducers';
import {
  fillForm,
  finishFormAction,
  setFormCurrentIndex,
} from 'Store/reducers/areaForm/actions';
import { AreaInfo } from 'Store/reducers/areaForm/types';
import { AreaForm } from './area';
import { EquipmentForm } from './equipment';
import { FacilityForm } from './facility';
import {
  FORM_COMMON_LAYOUT_EXPAND_OFFSET,
  FORM_COMMON_LAYOUT_MARGIN_TOP,
} from './layout.constant';
import { ProjectForm } from './project';
// interfaces
import { RequestorForm } from './requestor';
import { ReturnForm } from './return';

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

const LabelWithUnit: React.FC<{
  label?: string;
  n?: number;
  unit?: string;
}> = props => (
  <Row>
    <Col span={12}>
      <span>{props.label}</span>
    </Col>
    <Col span={6}>
      <span>{props.n}</span>
    </Col>
    <Col span={6}>
      <span>{props.unit}</span>
    </Col>
  </Row>
);

interface Props {
  ind?: number;
  data?: {
    forms: any;
    area: AreaInfo;
  };
  viewOnly?: boolean;
}

// constant
const DOWNLOAD_URL = END_POINT + '/file';
const OverviewCommonForm: React.FC<FormComponentProps & Props> = props => {
  const CUR_IND = props.ind || 3;
  const { validateFields } = props.form;
  const dispatch = useDispatch();

  const {} =
    props.data || useSelector((s: RootReducersType) => s.AreaFormReducers);

  const { forms, area } =
    props.data || useSelector((s: RootReducersType) => s.AreaFormReducers);
  const requestorData: RequestorForm | undefined = forms[0];
  const projectData: ProjectForm | undefined = forms[1];
  const areaData: AreaForm | undefined = forms[2];
  const equipmentData: EquipmentForm | undefined = forms[3];
  const returnForm: ReturnForm | undefined = forms[4];
  const facilityData: FacilityForm | undefined = forms[5];

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
      <OverviewBorderLayout
        viewOnly={props.viewOnly}
        expandOffset={FORM_COMMON_LAYOUT_EXPAND_OFFSET}
        marginTop={FORM_COMMON_LAYOUT_MARGIN_TOP}
      >
        {!props.viewOnly && (
          <Outline style={{ color: '#1890FF' }}>ข้อมูลการจอง</Outline>
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

        {/* requestor data */}
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

        {/* project */}
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

        {areaData && Object.keys(areaData).length > 0 && (
          <CustomLabel>บริการสนามกีฬา</CustomLabel>
        )}
        {areaData?.basketball ? (
          <CustomParagraph>
            <LabelWithUnit
              label="สนามบาสเกตบอล"
              n={areaData?.basketball}
              unit="สนาม"
            />
          </CustomParagraph>
        ) : null}
        {areaData?.volleyball ? (
          <CustomParagraph>
            <LabelWithUnit
              label="สนามวอลเลย์บอล"
              n={areaData?.volleyball}
              unit="สนาม"
            />
          </CustomParagraph>
        ) : null}
        {areaData?.sepaktakraw ? (
          <CustomParagraph>
            <LabelWithUnit
              label="สนามเซปัคตะกร้อ"
              n={areaData?.sepaktakraw}
              unit="สนาม"
            />
          </CustomParagraph>
        ) : null}
        {areaData?.badminton ? (
          <CustomParagraph>
            <LabelWithUnit
              label="สนามแบดมินตัน"
              n={areaData?.badminton}
              unit="สนาม"
            />
          </CustomParagraph>
        ) : null}
        {areaData?.tennis ? (
          <CustomParagraph>
            <LabelWithUnit
              label="สนามเทนนิส"
              n={areaData?.tennis}
              unit="สนาม"
            />
          </CustomParagraph>
        ) : null}
        {areaData?.tabletennis ? (
          <CustomParagraph>
            <LabelWithUnit
              label="โต๊ะเทเบิลเทนนิส"
              n={areaData?.tabletennis}
              unit="ตัว"
            />
          </CustomParagraph>
        ) : null}

        <CustomLabel>วัสดุอุปกรณ์กีฬา</CustomLabel>

        {equipmentData?.football ? (
          <CustomParagraph>
            <LabelWithUnit
              label="ลูกฟุตบอล"
              n={equipmentData?.football}
              unit="ลูก"
            />
          </CustomParagraph>
        ) : null}
        {equipmentData?.futsal ? (
          <CustomParagraph>
            <LabelWithUnit
              label="ลูกฟุตซอล"
              n={equipmentData?.futsal}
              unit="ลูก"
            />
          </CustomParagraph>
        ) : null}
        {equipmentData?.basketball ? (
          <CustomParagraph>
            <LabelWithUnit
              label="ลูกบาสเกตบอล"
              n={equipmentData?.basketball}
              unit="ลูก"
            />
          </CustomParagraph>
        ) : null}
        {equipmentData?.volleyball ? (
          <CustomParagraph>
            <LabelWithUnit
              label="ลูกวอลเลย์บอล"
              n={equipmentData?.volleyball}
              unit="ลูก"
            />
          </CustomParagraph>
        ) : null}
        {equipmentData?.sepaktakraw ? (
          <CustomParagraph>
            <LabelWithUnit
              label="ลูกเซปัคตะกร้อ"
              n={equipmentData?.sepaktakraw}
              unit="ลูก"
            />
          </CustomParagraph>
        ) : null}
        {equipmentData?.shareball ? (
          <CustomParagraph>
            <LabelWithUnit
              label="ลูกแชร์บอล"
              n={equipmentData?.shareball}
              unit="ลูก"
            />
          </CustomParagraph>
        ) : null}

        {equipmentData?.shareballbasket ? (
          <CustomParagraph>
            <LabelWithUnit
              label="ตะกร้าแชร์บอล"
              n={equipmentData?.shareballbasket}
              unit="ตะกร้า"
            />
          </CustomParagraph>
        ) : null}

        {equipmentData?.other ? (
          <React.Fragment>
            <CustomLabel>อื่น ๆ </CustomLabel>
            <CustomParagraph>{equipmentData.other}</CustomParagraph>
          </React.Fragment>
        ) : null}

        {returnForm && returnForm.return && (
          <React.Fragment>
            <CustomLabel>วัน/เดือน/ปี ส่งคืนอุปกรณ์</CustomLabel>
            <CustomParagraph>
              {returnForm &&
                returnForm.return &&
                moment(returnForm.return).format('DD')}{' '}
              {projectData &&
                returnForm.return &&
                moment(returnForm.return).format('MMMM')}{' '}
              {projectData &&
                returnForm.return &&
                moment(returnForm.return).format('YYYY')}
            </CustomParagraph>
          </React.Fragment>
        )}

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
                  moment(facilityData.startAirTime).format('HH.mm')}{' '}
                ถึงเวลา{' '}
                {facilityData &&
                  moment(facilityData.stopAirTime).format('HH.mm')}{' '}
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
          <ButtonActionLayout>
            <Button type="confirm" onClick={onSubmit}>
              ยืนยันข้อมูลการจอง
            </Button>
          </ButtonActionLayout>
        )}
      </OverviewBorderLayout>
    </React.Fragment>
  );
};

export default Form.create<FormComponentProps & Props>({
  name: 'overview-sport',
})(OverviewCommonForm);
