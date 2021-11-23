import { Timeline as MantineTimeline, Skeleton } from '@mantine/core'
import { ExternalLinkIcon } from '@modulz/radix-icons'
import { normalizeDate, normalizeDuration } from '@/utils/helper'

const TimelineLoading = () => (
  <MantineTimeline bulletSize={24} lineWidth={2}>
    {Array.from(Array(10)).map((v, i) => (
      <MantineTimeline.Item key={i}>
        <Skeleton height={25} className="w-full" key={i} />
      </MantineTimeline.Item>
    ))}
  </MantineTimeline>
)

const Timeline = ({ loading = true, active, datas }) => {
  return (
    <>
      {loading ? (
        <TimelineLoading />
      ) : (
        <MantineTimeline active={active} bulletSize={24} lineWidth={2}>
          {datas.map((data, i) => (
            <MantineTimeline.Item
              bullet={<ExternalLinkIcon size={12} />}
              title={data.label}
              key={i}
            >
              {data.startedAt ? (
                <>
                  <p className="text-xs mt-2">
                    {normalizeDate(data.startedAt)}
                  </p>
                  <p className="text-xs mt-2">
                    {data?.conclusion ? (
                      <>
                        Completed in
                        {normalizeDuration(data.completedAt - data.startedAt)}
                      </>
                    ) : (
                      <>In progress...</>
                    )}
                  </p>
                </>
              ) : (
                <p className="text-xs mt-2">Queueing...</p>
              )}
            </MantineTimeline.Item>
          ))}
        </MantineTimeline>
      )}
    </>
  )
}

export default Timeline
