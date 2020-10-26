import Button from 'Components/Button';
import React from 'react';

const DownloadButton: React.FC<{
  onClick?: () => void;
  downloadUrl: string;
}> = props => {
  function onDownload(id: string) {
    window.open(props.downloadUrl + '/' + id);
  }
  return (
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
      onClick={() => onDownload(props.downloadUrl)}
    >
      ดาวน์โหลด
    </Button>
  );
};

export default DownloadButton;
