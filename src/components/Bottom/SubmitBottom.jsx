import { Button } from 'antd'
import { useTranslation } from 'react-i18next';

const SubmitBottom = (props) => {
  const { t } = useTranslation()
  const { goBack, handleSubmit, isLoading, children } = props

  return (
    <div className={`
      w-full
      bg
      fixed
      flex
      justify-end
      left-0
      right-0
      bottom-0
      py-5px
      px-30px
      box-border
      shadow
      shadow-gray-500
    `}>
      {children}

      <Button
        className="mr-10"
        danger
        onClick={goBack}
      >
        {t('public.back')}
      </Button>
      <Button
        loading={!!isLoading}
        type="primary"
        onClick={handleSubmit}
      >
        {t('public.submit')}
      </Button>
    </div>
  )
}

export default SubmitBottom
