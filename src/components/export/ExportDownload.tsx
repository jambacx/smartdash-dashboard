import React from 'react';
import Papa from 'papaparse';
import { CloudDownloadRounded } from '@mui/icons-material';
import { Button, CircularProgress } from '@mui/material';

const CsvDownload = ({ title, data, loading }: { title: string, data: any, loading: any }) => {
  const handleDownload = () => {

    const csv = Papa.unparse(data);
    const BOM = "\uFEFF";
    const csvData = new Blob([BOM + csv], { type: 'text/csv;charset=utf-8;' });

    const csvUrl = URL.createObjectURL(csvData);
    const tempLink = document.createElement('a');
    tempLink.href = csvUrl;
    tempLink.setAttribute('download', `${title}.csv`);
    document.body.appendChild(tempLink);
    tempLink.click();
    document.body.removeChild(tempLink);
  };



  return (
    <Button
      variant="contained"
      disabled={loading}
      startIcon={!loading && <CloudDownloadRounded />}
      onClick={() => handleDownload()}
    >
      {loading
        ? (
          <>
            <CircularProgress
              size={24}
              color="inherit"
              style={{ marginRight: 10 }}
            />
            Export хийх
          </>
        )
        : (
          "Export хийх"
        )}
    </Button>
  );
};

export default CsvDownload;
