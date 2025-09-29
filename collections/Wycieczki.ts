import type { CollectionConfig } from 'payload';
import { isAdmin } from './access/admins';

export const Wycieczki: CollectionConfig = {
  slug: 'wycieczki',
  labels: {
    singular: 'Wycieczka',
    plural: 'Wycieczki',
  },
  access: {
    create: isAdmin,
    read: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'tripCode', 'basePrice', 'startDate', 'status'],
  },
  fields: [
    {
      name: 'image',
      type: 'upload',
      //@ts-ignore
      relationTo: 'media',
      label: 'Zdjęcie główne',
      required: true,
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Tytuł wycieczki',
      localized: true,
    },
    {
      name: 'shortDescription',
      type: 'textarea',
      required: true,
      label: 'Krótki opis',
      maxLength: 160,
      localized: true,
    },
    {
      name: 'description',
      type: 'richText',
      required: true,
      label: 'Pełny opis',
      localized: true,
    },
    {
      name: 'tripType',
      type: 'select',
      required: true,
      label: 'Typ wycieczki',
      options: [
        { label: 'Wycieczka promowo-autokarowa', value: 'ferry-bus' },
        { label: 'Wycieczka promowa', value: 'ferry-only' },
        { label: 'Rejs wycieczkowy', value: 'cruise' },
      ],
      defaultValue: 'ferry-bus',
    },
    {
      name: 'duration',
      type: 'number',
      required: true,
      label: 'Długość (dni)',
      min: 1,
      defaultValue: 3,
    },
    {
      name: 'tripCode',
      type: 'text',
      label: 'Kod imprezy',
      admin: {
        description: 'np. KG/048',
      },
    },
    {
      name: 'departurePort',
      type: 'text',
      required: true,
      label: 'Port wyjazdu',
      defaultValue: 'Świnoujście',
    },
    {
      name: 'destinations',
      type: 'array',
      required: true,
      label: 'Destynacje',
      fields: [
        {
          name: 'city',
          type: 'text',
          required: true,
          label: 'Miasto',
        },
        {
          name: 'attractions',
          type: 'array',
          label: 'Atrakcje',
          fields: [
            {
              name: 'name',
              type: 'text',
              required: true,
              label: 'Nazwa',
            },
          ],
        },
      ],
    },
    {
      name: 'schedule',
      type: 'array',
      required: true,
      label: 'Program wycieczki',
      fields: [
        {
          name: 'day',
          type: 'number',
          required: true,
          label: 'Dzień',
          min: 1,
        },
        {
          name: 'activities',
          type: 'richText',
          required: true,
          label: 'Opis dnia',
        },
      ],
    },
    {
      name: 'services',
      type: 'array',
      required: true,
      label: 'Świadczenia',
      fields: [
        {
          name: 'service',
          type: 'text',
          required: true,
          label: 'Świadczenie',
        },
      ],
    },
    {
      name: 'dates',
      type: 'array',
      required: true,
      label: 'Terminy i ceny',
      fields: [
        {
          name: 'startDate',
          type: 'date',
          required: true,
          label: 'Data rozpoczęcia',
        },
        {
          name: 'endDate',
          type: 'date',
          required: true,
          label: 'Data zakończenia',
        },
        {
          name: 'basePrice',
          type: 'number',
          required: true,
          label: 'Cena bazowa (PLN)',
          min: 0,
        },
        {
          name: 'childPrice',
          type: 'number',
          label: 'Cena dziecko 7-10 lat (PLN)',
          min: 0,
        },
        {
          name: 'infantFree',
          type: 'checkbox',
          label: 'Bezpłatnie dzieci do 6 lat',
          defaultValue: true,
        },
        {
          name: 'status',
          type: 'select',
          required: true,
          label: 'Status',
          options: [
            { label: 'Dostępne', value: 'available' },
            { label: 'Sprzedane', value: 'sold-out' },
            { label: 'Ostatnie miejsca', value: 'limited' },
          ],
          defaultValue: 'available',
        },
        {
          name: 'availableSpots',
          type: 'number',
          label: 'Dostępne miejsca',
          min: 0,
        },
      ],
    },
    {
      name: 'supplements',
      type: 'array',
      label: 'Dopłaty',
      fields: [
        {
          name: 'type',
          type: 'text',
          required: true,
          label: 'Typ',
          admin: {
            description: 'np. "Kabina 3-osobowa"',
          },
        },
        {
          name: 'price',
          type: 'number',
          required: true,
          label: 'Cena (PLN)',
          min: 0,
        },
        {
          name: 'unit',
          type: 'select',
          label: 'Jednostka',
          options: [
            { label: 'Od osoby', value: 'per-person' },
            { label: 'Za kabinę/pokój', value: 'per-room' },
          ],
          defaultValue: 'per-person',
        },
      ],
    },
    {
      name: 'additionalFees',
      type: 'group',
      label: 'Dodatkowe opłaty',
      fields: [
        {
          name: 'touristGuaranteeFund',
          type: 'number',
          label: 'Turystyczny Fundusz Gwarancyjny (PLN)',
          defaultValue: 10,
        },
        {
          name: 'touristAidFund',
          type: 'number',
          label: 'Turystyczny Fundusz Pomocowy (PLN)',
          defaultValue: 10,
        },
      ],
    },
    {
      name: 'notIncluded',
      type: 'array',
      label: 'Cena nie obejmuje',
      fields: [
        {
          name: 'item',
          type: 'text',
          required: true,
          label: 'Pozycja',
        },
      ],
    },
    {
      name: 'facilities',
      type: 'array',
      label: 'Udogodnienia na promie',
      fields: [
        {
          name: 'facility',
          type: 'text',
          required: true,
          label: 'Udogodnienie',
        },
      ],
    },
    {
      name: 'documents',
      type: 'array',
      label: 'Dokumenty do pobrania',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Tytuł dokumentu',
        },
        {
          name: 'file',
          type: 'upload',
          //@ts-ignore
          relationTo: 'media',
          required: true,
          label: 'Plik PDF',
        },
      ],
    },
    {
      name: 'organizer',
      type: 'group',
      label: 'Organizator',
      fields: [
        {
          name: 'name',
          type: 'text',
          label: 'Nazwa',
          defaultValue: 'Polska Żegluga Bałtycka S.A. - Polferries',
        },
        {
          name: 'phone',
          type: 'text',
          label: 'Telefon',
          defaultValue: '+48 22 230 22 23',
        },
        {
          name: 'email',
          type: 'email',
          label: 'Email',
          defaultValue: 'wycieczki@polferries.pl',
        },
      ],
    },
    {
      name: 'featured',
      type: 'checkbox',
      label: 'Wyróżniona',
      defaultValue: false,
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      label: 'Status publikacji',
      options: [
        { label: 'Szkic', value: 'draft' },
        { label: 'Opublikowana', value: 'published' },
        { label: 'Archiwalna', value: 'archived' },
      ],
      defaultValue: 'draft',
    },
  ],
};
