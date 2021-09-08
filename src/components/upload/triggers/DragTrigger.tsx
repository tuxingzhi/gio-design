import React, { useState, useContext } from 'react';
import classnames from 'classnames';
import { ITriggerProps, STATUS_SUCCESS, STATUS_UPLOADING, STATUS_NOT_YET, STATUS_ERROR } from '../interface';
import { UploadPrefixClsContext } from '../UploadContext';
import Preview, { PreviewForNotImage } from '../Preview';
import Actions from '../Actions';
import { isOnlyAcceptImg, isImageFile } from '../utils';
import { FolderSVG, PictureSVG, DisabledFolderSVG, DisabledPictureSVG } from '../svg';
import Progress from '../../progress';

const DragTrigger: React.FC<ITriggerProps> = ({
  triggerProps,
  file,
  accept,
  onRemove,
  iconSize,
  items,
  finishCount = 0,
  disabled,
  directory,
  multiple,
  maxCount,
  dragStyle,
  onReSelect,
}: ITriggerProps) => {
  const [dragState, setDragState] = useState('');
  const prefixCls = useContext(UploadPrefixClsContext);
  const cls = classnames(triggerProps?.className, `${prefixCls}__drag`, {
    [`${prefixCls}__drag--hover`]: dragState === 'dragover',
  });
  const placeholderCls = classnames(`${prefixCls}__drag-placeholder`);
  const progressCls = classnames(`${prefixCls}__drag-progress`);

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => setDragState(e.type);

  const [currentWidth, currentHeight] = Array.isArray(iconSize) ? iconSize : [iconSize, iconSize];

  const fileListLength = items?.length ?? 0;

  const renderDisabledPlaceholder = () =>
    isOnlyAcceptImg(accept) ? (
      <>
        <DisabledPictureSVG style={{ width: currentWidth, height: currentHeight }} />
        <div>已上传{finishCount}张图片，不可继续上传</div>
      </>
    ) : (
      <>
        <DisabledFolderSVG style={{ width: currentWidth, height: currentHeight }} />
        <div>已上传{finishCount}个文件，不可继续上传</div>
      </>
    );

  const renderPlaceholder = () =>
    isOnlyAcceptImg(accept) ? (
      <>
        <PictureSVG style={{ width: currentWidth, height: currentHeight }} />
        <div>
          已上传{finishCount}张图片，总共可以上传{maxCount}张图片
        </div>
      </>
    ) : (
      <>
        <FolderSVG style={{ width: currentWidth, height: currentHeight }} />
        <div>
          已上传{finishCount}个文件，总共可以上传{maxCount}个文件
        </div>
      </>
    );

  // 单个文件上传渲染
  const renderSingleUpload = () => (
    <div className={cls} onDrop={handleDrag} onDragOver={handleDrag} onDragLeave={handleDrag} style={dragStyle}>
      {'percent' in file && file.status === STATUS_UPLOADING ? (
        <div className={`${prefixCls}__drag-container`}>
          <Progress
            percent={file.percent}
            status="active"
            className={progressCls}
            format={() => <span style={{ color: '#313E75' }}>{Math.round((file.percent || 0) * 100) / 100}%</span>}
          />
          <span className="loading-text">正在上传，请耐心等待</span>
        </div>
      ) : null}
      {file.status === STATUS_SUCCESS && (
        <>
          {isImageFile(file) || isOnlyAcceptImg(accept) ? (
            <>
              <Preview file={file} size="100%" />{' '}
              <Actions file={file} useUpload onRemove={onRemove} placement="rightTop" />
            </>
          ) : (
            <>
              <PreviewForNotImage onRemove={onRemove} onReSelect={onReSelect} file={file} />
              <Actions file={file} onRemove={onRemove} showModal={false} />
            </>
          )}
        </>
      )}
      {file.status === STATUS_ERROR && (
        <>
          {isOnlyAcceptImg(accept) ? (
            <div className={placeholderCls}>
              <PictureSVG style={{ width: currentWidth, height: currentHeight }} />
              <div>点击上传或拖拽图片到此区域</div>
            </div>
          ) : (
            <>
              <PreviewForNotImage onReSelect={onReSelect} file={file} />
              <Actions file={file} onRemove={onRemove} showModal={false} />
            </>
          )}
        </>
      )}
      {file.status === STATUS_NOT_YET && (
        <div className={placeholderCls}>
          {isOnlyAcceptImg(accept) ? (
            <>
              <PictureSVG style={{ width: currentWidth, height: currentHeight }} />
              <div>点击上传或拖拽图片到此区域</div>
            </>
          ) : (
            <>
              <FolderSVG style={{ width: currentWidth, height: currentHeight }} />
              <div>点击上传或拖拽文件到此区域</div>
            </>
          )}
        </div>
      )}
    </div>
  );

  // 批量上传渲染
  const renderMultipleUpload = () => {
    const currentProgress = (finishCount / fileListLength) * 100;
    const multiplePercent = fileListLength > 1 ? currentProgress : file.percent;
    return (
      <div className={cls} onDrop={handleDrag} onDragOver={handleDrag} onDragLeave={handleDrag} style={dragStyle}>
        {finishCount < fileListLength ? (
          <div className={`${prefixCls}__drag-container`}>
            <Progress
              percent={multiplePercent}
              status="active"
              className={progressCls}
              format={() => <span style={{ color: '#313E75' }}>{Math.round((multiplePercent || 0) * 100) / 100}%</span>}
            />
            <span className="loading-text">正在上传，请耐心等待</span>
          </div>
        ) : null}

        {fileListLength !== 0 &&
          finishCount === fileListLength &&
          (disabled ? (
            <div className={placeholderCls}>{renderDisabledPlaceholder()}</div>
          ) : (
            <div className={placeholderCls}>{renderPlaceholder()}</div>
          ))}
        {fileListLength === 0 && file.status === STATUS_NOT_YET && (
          <div className={placeholderCls}>
            {isOnlyAcceptImg(accept) ? (
              <PictureSVG style={{ width: currentWidth, height: currentHeight }} />
            ) : (
              <FolderSVG style={{ width: currentWidth, height: currentHeight }} />
            )}
            <div>点击上传或拖拽文件到此区域</div>
          </div>
        )}
      </div>
    );
  };

  const renderUpload = () => (directory || multiple ? renderMultipleUpload() : renderSingleUpload());

  return <>{renderUpload()}</>;
};

export default DragTrigger;
