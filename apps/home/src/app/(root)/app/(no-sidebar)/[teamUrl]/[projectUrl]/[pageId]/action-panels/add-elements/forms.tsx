import { createId } from '@paralleldrive/cuid2'
import Element from './element'
import type { PanelElement } from '.'
import FormIcon from '@/icons/elements/form.svg'
import LabelIcon from '@/icons/elements/label.svg'
import InputIcon from '@/icons/elements/input.svg'
import TextAreaIcon from '@/icons/elements/textarea.svg'
import CheckboxIcon from '@/icons/elements/checkbox.svg'
import RadioIcon from '@/icons/elements/radio.svg'
import SelectIcon from '@/icons/elements/select.svg'
import OptionIcon from '@/icons/elements/option.svg'
import SubmitButtonIcon from '@/icons/elements/submit-button.svg'

const FORMS_ELEMENTS: PanelElement[] = [
  {
    Icon: <FormIcon className="w-full h-full" />,
    title: 'From Group',
    element: 'form',
    style: {},
    children: [],
  },
  {
    Icon: <LabelIcon className="w-full h-full" />,
    title: 'Label',
    element: 'label',
    style: {
      default: {
        fontSize: '0.875rem',
        fontWeight: '500',
        lineHeight: '1.25rem',
        letterSpacing: '0.025rem',
        textAlign: 'left',
        color: '#000000',
      },
    },
    children: ['Label'],
  },
  {
    Icon: <InputIcon className="w-full h-full" />,
    title: 'Input',
    element: 'input',
    style: {
      default: {
        width: '100%',
        height: '2.5rem',
        borderWidth: '1px',
        borderColor: '#000000',
        borderRadius: '0.25rem',
        paddingLeft: '0.5rem',
        paddingRight: '0.5rem',
        paddingTop: '0.25rem',
        paddingBottom: '0.25rem',
        fontSize: '0.875rem',
        fontWeight: '400',
        lineHeight: '1.25rem',
        letterSpacing: '0.025rem',
        textAlign: 'left',
        color: '#000000',
        backgroundColor: '#ffffff',
      },
    },
    attributes: {
      type: 'text',
      placeholder: 'Input',
    },
    children: [],
  },
  {
    Icon: <TextAreaIcon className="w-full h-full" />,
    title: 'Text Area',
    element: 'textarea',
    style: {
      default: {
        width: '100%',
        height: '2.5rem',
        borderWidth: '1px',
        borderColor: '#000000',
        borderRadius: '0.25rem',
        paddingLeft: '0.5rem',
        paddingRight: '0.5rem',
        paddingTop: '0.25rem',
        paddingBottom: '0.25rem',
        fontSize: '0.875rem',
        fontWeight: '400',
        lineHeight: '1.25rem',
        letterSpacing: '0.025rem',
        textAlign: 'left',
        color: '#000000',
        backgroundColor: '#ffffff',
      },
    },
    attributes: {
      placeholder: 'Text Area',
    },
    children: [],
  },
  {
    Icon: <CheckboxIcon className="w-full h-full" />,
    title: 'Checkbox',
    element: 'input',
    style: {},
    attributes: {
      type: 'checkbox',
    },
    children: [],
  },
  {
    Icon: <RadioIcon className="w-full h-full" />,
    title: 'Radio',
    element: 'input',
    style: {},
    attributes: {
      type: 'radio',
    },
    children: [],
  },
  {
    Icon: <SelectIcon className="w-full h-full" />,
    title: 'Select',
    element: 'select',
    style: {},
    attributes: {
      placeholder: 'Select',
    },
    children: Array.from({ length: 3 }, (_, i) => ({
      id: createId(),
      type: 'option',
      style: {},
      attributes: {},
      children: [`Option ${i + 1}`],
    })),
  },
  {
    Icon: <OptionIcon className="w-full h-full" />,
    title: 'Select Option',
    element: 'option',
    style: {},
    attributes: {},
    children: ['Option'],
  },
  {
    Icon: <SubmitButtonIcon className="w-full h-full" />,
    title: 'Submit Button',
    element: 'button',
    style: {
      default: {
        width: '100%',
        height: '2.5rem',
        borderWidth: '1px',
        borderColor: '#000000',
        borderRadius: '0.25rem',
        paddingLeft: '0.5rem',
        paddingRight: '0.5rem',
        paddingTop: '0.25rem',
        paddingBottom: '0.25rem',
        fontSize: '0.875rem',
        fontWeight: '400',
        lineHeight: '1.25rem',
        letterSpacing: '0.025rem',
        textAlign: 'left',
        color: '#000000',
        backgroundColor: '#ffffff',
      },
    },
    attributes: {
      type: 'submit',
    },
    children: [
      {
        id: createId(),
        type: 'span',
        style: {},
        children: ['Submit'],
      },
    ],
  },
]

const FormsElements = () => {
  return (
    <>
      <h1 className="text-sm font-medium">Forms</h1>
      <div className="grid grid-cols-[repeat(var(--grid-cols-count),1fr)] gap-4 flex-wrap">
        {FORMS_ELEMENTS.map((element) => (
          <Element
            Icon={element.Icon}
            attributes={element.attributes}
            element={element.element}
            key={element.title}
            style={element.style}
            title={element.title}>
            {element.children}
          </Element>
        ))}
      </div>
    </>
  )
}

export default FormsElements
