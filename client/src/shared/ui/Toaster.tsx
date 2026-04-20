import { Toaster as ReactHotToaster } from 'react-hot-toast';

export function Toaster() {
  return (
    <ReactHotToaster
      position="bottom-right"
      gutter={5}
      toasterId="default"
      toastOptions={{
        style: {
          maxWidth: '250px',
          padding: '8px 12px',
        },

        success: {
          duration: 3000,
          style: {
            color: '#00ff00',
            background: '#ffffff',
          },
        },

        error: {
          duration: 5000,
          style: {
            color: '#ff0000',
            background: '#ffffff',
          },
        },
      }}
    />
  );
}
