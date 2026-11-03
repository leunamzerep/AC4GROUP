// Datos fijos del sitio (no dependen del idioma).
// Para cambiar un enlace o un dato de contacto, edita solo este archivo.

export const SITE = {
  url: 'https://leunamzerep.github.io/AC4GROUP/',
  whatsappNumber: '573107993836',
  email: 'andrescorreal2803@gmail.com',
  instagram: 'https://www.instagram.com/ac4group_oficial/',
  // PENDIENTE: URL de la página de Facebook. Mientras esté vacía, el botón no se muestra.
  facebook: '',
  caseInstagram: 'https://www.instagram.com/amab_tienda_virtual/',
  credit: { name: 'Zumia Solutions', url: 'https://zumiasolutions.xyz' },
} as const

export const whatsappUrl = (message: string) =>
  `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(message)}`
