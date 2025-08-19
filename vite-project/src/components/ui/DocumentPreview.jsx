import { FaFilePdf } from 'react-icons/fa';

function DocumentPreview({ document }) {
  const handleDownload = () => {
    window.open(document.filePath, '_blank');
  };

  return (
    <div className="border rounded-lg p-3 hover:shadow-md transition-shadow">
      <div className="flex items-center space-x-3">
        <FaFilePdf className="text-red-500 text-2xl" />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900 truncate">
            {document.fileName}
          </p>
          <p className="text-xs text-gray-500">
            {Math.round(document.fileSize / 1024)} KB
          </p>
        </div>
      </div>
      <button
        onClick={handleDownload}
        className="mt-2 w-full py-1 px-2 bg-blue-50 text-blue-600 text-xs rounded hover:bg-blue-100"
      >
        View/Download
      </button>
    </div>
  );
}

export default DocumentPreview;