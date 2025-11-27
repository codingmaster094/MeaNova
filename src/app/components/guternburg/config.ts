import { EXPERIMENTAL_TableFeature, FixedToolbarFeature, HeadingFeature, InlineToolbarFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
import { Field } from 'payload'

export const Content: Field = {
  name: 'content',
  type: 'group',
  label: {
    en: 'content Section',
    de: 'Inhalt Bereich',
  },
  fields: [
    {
          name: 'richText',
          type: 'richText',
          label: {
            en: 'Rich Text',
            de: 'Rich Text',
          },
          editor: lexicalEditor({
            features: ({ defaultFeatures }) => [
              ...defaultFeatures,
              HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
              FixedToolbarFeature(),
              InlineToolbarFeature(),
              EXPERIMENTAL_TableFeature(),
            ],
          }),
        },
  ],
}
