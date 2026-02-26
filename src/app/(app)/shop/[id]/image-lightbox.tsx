// ABOUTME: Client component that shows a product image with a click-to-expand lightbox.
// ABOUTME: Uses HeadlessUI Dialog to display the full image in a modal overlay.

'use client'

import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'

export function ImageLightbox({ src, alt }: { src: string; alt: string }) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className="cursor-zoom-in">
        <img
          alt={alt}
          src={src}
          className="aspect-square w-full rounded-lg object-cover"
        />
      </button>

      <Dialog open={open} onClose={setOpen} className="relative z-50">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-black/80 transition-opacity duration-300 ease-linear data-closed:opacity-0"
        />
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <DialogPanel
            transition
            className="relative max-h-[90vh] max-w-[90vw] transition duration-300 ease-out data-closed:scale-95 data-closed:opacity-0"
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="absolute -top-10 right-0 text-white hover:text-gray-300"
            >
              <span className="sr-only">Close</span>
              <XMarkIcon aria-hidden="true" className="size-8" />
            </button>
            <img
              alt={alt}
              src={src}
              className="max-h-[85vh] max-w-[90vw] rounded-lg object-contain"
            />
          </DialogPanel>
        </div>
      </Dialog>
    </>
  )
}
