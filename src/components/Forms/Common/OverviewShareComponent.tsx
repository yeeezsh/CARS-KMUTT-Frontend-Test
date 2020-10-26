import moment from 'moment';
import React from 'react';
import { useSelector } from 'react-redux';
import { END_POINT } from 'Services/adapter.interface';
import { RootReducersType } from 'Store/reducers';
import { AreaInfo } from 'Store/reducers/areaForm/types';
import CustomBreakLine from '../shared/CustomBreakLine';
import CustomLabel from '../shared/CustomLabel';
import CustomParagraph from '../shared/CustomParagraph';
import CustomSubHeader from '../shared/CustomSubHeader';
import DownloadButton from '../shared/DownloadButton';
import { ProjectForm } from './project';
import { RequestorForm } from './requestor';

const DOWNLOAD_URL = END_POINT + '/file';

const OverviewShareComponent: React.FC<{
  data: {
    forms: any;
    area: AreaInfo;
  };
}> = props => {
  const { forms, area } =
    props.data || useSelector((s: RootReducersType) => s.AreaFormReducers);
  const requestorData: RequestorForm | undefined = forms[0];
  const projectData: ProjectForm | undefined = forms[1];

  return (
    <>
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
        น.
        {projectData &&
        !projectData.projectStopDate && // when not have stop date show end time here
          projectData.projectStopTime &&
          ' ถึง ' +
            moment(projectData.projectStopTime).format('HH.mm')}{' '}
        <br />
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
      <CustomBreakLine />
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
        {requestorData && requestorData.department}
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
      <CustomBreakLine />
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
              {e.name} <DownloadButton downloadUrl={DOWNLOAD_URL} />
            </React.Fragment>
          ))}
      </CustomParagraph>

      <CustomLabel>อาจารย์ที่ปรึกษา</CustomLabel>
      <CustomParagraph>
        {projectData && projectData.advisor}
      </CustomParagraph>
    </>
  );
};

export default OverviewShareComponent;
