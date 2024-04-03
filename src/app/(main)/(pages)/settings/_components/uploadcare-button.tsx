"use client";
import React, { useEffect, useRef } from "react";
import * as LR from "@uploadcare/blocks";
import { useRouter } from "next/navigation";

type Props = {
    onUpload?: any;
};

LR.registerBlocks(LR);

const UploadCareButton = ({ onUpload }: Props) => {
    const router = useRouter();
    const ctxProviderRef = useRef<
        typeof LR.UploadCtxProvider.prototype & LR.UploadCtxProvider
    >(null);

    useEffect(() => {
        const handleUpload = async (e: any) => {
        const file = await onUpload(e.detail.cdnUrl);
        if (file) {
            router.refresh();
        }
        };
        ctxProviderRef.current!.addEventListener( // ctxProfiderRef.current may be null
        "file-upload-success",
        handleUpload
        );
    }, []);

    return (
        <div>
            <lr-config ctx-name="my-uploader" pubkey="68dfbac699eea3560ca6" />

            <lr-file-uploader-regular
                ctx-name="my-uploader"
                css-src={`https://cdn.jsdelivr.net/npm/@uploadcare/blocks@0.35.2/web/lr-file-uploader-regular.min.css`}
            />

            <lr-upload-ctx-provider ctx-name="my-uploader" ref={ctxProviderRef} />
        </div>
    );
};

export default UploadCareButton;
