"use client"

import QRCode from "react-qr-code"

type QrCodeDisplayProps = {
  value: string
}

export function QrCodeDisplay({ value }: QrCodeDisplayProps) {
  return (
    <QRCode
      value={value}
      size={160}
      bgColor="#ffffff"
      fgColor="#000000"
      level="M"
    />
  )
}
