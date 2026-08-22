import { Field } from 'payload'

const cardFields: Field[] = [
  {
    name: 'icon',
    type: 'upload',
    relationTo: 'media',
    required: false,
    label: { en: 'Icon', de: 'Icon' },
  },
  {
    name: 'heading',
    type: 'text',
    required: false,
    label: { en: 'Title', de: 'Titel' },
  },
  {
    name: 'text',
    type: 'textarea',
    required: false,
    label: { en: 'Description', de: 'Beschreibung' },
  },
]

const audienceTabFields: Field[] = [
  {
    name: 'tabLabel',
    type: 'text',
    required: true,
    label: { en: 'Tab button', de: 'Tab-Button' },
    admin: {
      description: 'Shown as the clickable tab (e.g. Unternehmen or Kandidat:innen).',
    },
  },
  {
    name: 'topHeading',
    type: 'text',
    label: { en: 'Top slider heading', de: 'Obere Slider-Überschrift' },
  },
  {
    name: 'topCards',
    type: 'array',
    labels: { singular: { en: 'Card', de: 'Karte' }, plural: { en: 'Cards', de: 'Karten' } },
    label: { en: 'Top cards', de: 'Obere Karten' },
    fields: cardFields,
  },
  {
    type: 'collapsible',
    label: { en: 'Middle CTA', de: 'Mittlerer CTA' },
    fields: [
      {
        name: 'ctaHeading',
        type: 'text',
        label: { en: 'CTA heading', de: 'CTA-Überschrift' },
      },
      {
        name: 'ctaText',
        type: 'textarea',
        label: { en: 'CTA text', de: 'CTA-Text' },
      },
      {
        name: 'ctaLink',
        type: 'group',
        label: { en: 'CTA button', de: 'CTA-Button' },
        fields: [
          {
            name: 'label',
            type: 'text',
            label: { en: 'Label', de: 'Beschriftung' },
          },
          {
            name: 'url',
            type: 'text',
            label: { en: 'URL', de: 'URL' },
            admin: { description: 'e.g. #kontakt or /#kontakt' },
          },
          {
            name: 'target',
            type: 'select',
            defaultValue: '_self',
            options: [
              { label: { en: 'Same tab', de: 'Gleiches Tab' }, value: '_self' },
              { label: { en: 'New tab', de: 'Neues Tab' }, value: '_blank' },
            ],
          },
        ],
      },
    ],
  },
  {
    name: 'bottomHeading',
    type: 'text',
    label: { en: 'Bottom slider heading', de: 'Untere Slider-Überschrift' },
  },
  {
    name: 'bottomCards',
    type: 'array',
    labels: { singular: { en: 'Card', de: 'Karte' }, plural: { en: 'Cards', de: 'Karten' } },
    label: { en: 'Bottom cards', de: 'Untere Karten' },
    fields: cardFields,
  },
]

export const Unternehmen: Field = {
  name: 'unternehmen',
  type: 'group',
  label: {
    en: 'Companies & candidates',
    de: 'Unternehmen & Kandidat:innen',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: { en: 'Companies', de: 'Unternehmen' },
          fields: [
            {
              name: 'unternehmenTab',
              type: 'group',
              label: false,
              fields: audienceTabFields,
            },
          ],
        },
        {
          label: { en: 'Candidates', de: 'Kandidat:innen' },
          fields: [
            {
              name: 'kandidatenTab',
              type: 'group',
              label: false,
              fields: audienceTabFields,
            },
          ],
        },
      ],
    },
  ],
}

export default Unternehmen
