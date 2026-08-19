"usec client";

import { useEffect, useMemo, useState } from "react";
import { getAttachmentFromId } from "../actions";
import Loader from "./loader";

export default function Attachment({
  attachment,
  messageId,
}: {
  attachment: { attachmentId: string; mimetype: string; file: string };
  messageId: string;
}) {
  const [data, setData] = useState<{ fileUrl: string; blob: Blob } | null>(
    null,
  );
  const [error, setError] = useState<string | null>(null);

  const decodeBaseString = (baseString: string) => {
    if (!baseString) return null;

    try {
      // 1. Convert base64 string back into binary byte data
      const byteCharacters = atob(baseString);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);

      // 2. Create a standard Web Blob
      const fileBlob = new Blob([byteArray], { type: attachment.mimetype });

      // 3. Create a temporary local URL
      const fileUrl = URL.createObjectURL(fileBlob);

      return { fileUrl, blob: fileBlob };
    } catch (error) {
      console.error("Failed to decode attachment:", error);
      return null;
    }
  };

  useEffect(() => {
    async function fetchAttachment() {
      try {
        const value = await getAttachmentFromId(
          attachment.attachmentId,
          messageId,
        );
        if (value.error === null) {
          const filValue = decodeBaseString(value.data.data);
          if (!filValue) {
            setError("something went wrong");
            return;
          }
          setError(null);
          setData(filValue);
        } else {
          setError(value.error);
        }
      } catch (error) {
        console.error("Failed to load attachment:", error);
      } finally {
      }
    }

    fetchAttachment();
  }, [attachment.attachmentId, messageId]);

  return error === null && data ? (
    <div className='w-full'>
      {attachment.mimetype === "application/pdf" ? (
        <iframe
          src={data.fileUrl}
          className='w-full h-[90vh] md:h-[75vh] h-[50vh]'
        />
      ) : attachment.mimetype === "application/img" ? (
        <img src={data.fileUrl} className='w-full' />
      ) : (
        <div>dont know how to render this file type</div>
      )}
    </div>
  ) : error === null ? (
    <div className='w-full h-full p-2'>
      <Loader />
    </div>
  ) : (
    <div className='w-full text-center mt-2 font-bold'>{error}</div>
  );
}
