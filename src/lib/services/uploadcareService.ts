// src/lib/services/uploadcareService.ts

const UPLOADCARE_PUBLIC_KEY = process.env.UPLOADCARE_PUBLIC_KEY!;

  const formData = new FormData();
  formData.append('UPLOADCARE_PUB_KEY', UPLOADCARE_PUBLIC_KEY);
  formData.append('UPLOADCARE_STORE', '1');
  formData.append('file', file);

  const response = await fetch('https://upload.uploadcare.com/base/', {
    method: 'POST',
    body: formData,
  });
  if (!response.ok) {
    throw new Error('Uploadcare upload failed');
  }
  const data = await response.json();
  // คืนทั้งสองแบบ
  const uuid = data.file;
  const filename = file.name;
  // แบบ ucarecdn.com
  const cdnUrl = `https://ucarecdn.com/${uuid}/`;
  // แบบ subdomain (ใช้ subdomain จาก dashboard หรือ response)
  const subdomainUrl = `https://${uuid.substr(0,12)}.ucarecd.net/${uuid}/${filename}`;
  return {
    cdnUrl,
    subdomainUrl,
    filename,
    uuid
  };
}
