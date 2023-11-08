import React from 'react';
import Papa from 'papaparse';
import { CloudDownloadRounded } from '@mui/icons-material';
import { Button, CircularProgress } from '@mui/material';
import moment from 'moment'
const processData = (data: any, title: any) => {
  return data.map((item: any) => {
    const createdTime = moment.unix(item?.created_time).format('YYYY-MM-DD HH:mm');
    const expireTime = moment.unix(item?.expire_time).format('YYYY-MM-DD HH:mm');

    const itemWithoutEmojis = {
      ...item,
      created_time: createdTime,
      expire_time: expireTime,
    };


    if (title === 'Нийтлэл') {
      const updatedTime = moment.unix(item?.updated_time).format('YYYY-MM-DD HH:mm');
      const emojiCounts = {
        ANGRY: parseInt(item.ANGRY) || 0,
        LIKE: parseInt(item.LIKE) || 0,
        HAHA: parseInt(item.HAHA) || 0,
        SAD: parseInt(item.SAD) || 0,
        WOW: parseInt(item.WOW) || 0,
        CARE: parseInt(item.CARE) || 0,
        LOVE: parseInt(item.LOVE) || 0,
      };

      return {
        ...itemWithoutEmojis,
        ...emojiCounts,
        updated_time: updatedTime,
      };
    }

    return itemWithoutEmojis;
  });
};

const CsvDownload = ({ title, data, loading }: { title: string, data: any, loading: any }) => {
  const handleDownload = () => {
    const processValue = processData(data, title)
    const csv = Papa.unparse(processValue);
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
