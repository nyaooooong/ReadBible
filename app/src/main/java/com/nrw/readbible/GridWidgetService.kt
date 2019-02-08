package com.nrw.readbible

import android.appwidget.AppWidgetManager
import android.content.Context
import android.content.Intent
import android.widget.RemoteViews
import android.widget.RemoteViewsService

class GridWidgetService : RemoteViewsService() {
    override fun onGetViewFactory(intent: Intent?): RemoteViewsFactory {
        return GridRemoteViewsFactory(this.applicationContext, intent)
    }
}

class GridRemoteViewsFactory(context: Context, intent: Intent) : RemoteViewsService.RemoteViewsFactory {
    private val mWidgetItems = ArrayList<WidgetItem>
    private val mContext = context
    private val mAppWidgetId = intent.getIntExtra(AppWidgetManager.EXTRA_APPWIDGET_ID, AppWidgetManager.INVALID_APPWIDGET_ID)

    companion object {
        private val mCount = 10
    }

    override fun onCreate() {
        for (i in 0 .. mCount) {
            mWidgetItems.add(WidgetItem("${i}!"))
        }
    }

    override fun getCount(): Int {
        return mCount
    }

    override fun getViewAt(position: Int): RemoteViews {
        val rv = RemoteViews(mContext.packageName, R.layout.widget_item)
        rv.setTextViewText(R.id.widget_item, mWidgetItems.get(position).something)
        Intent().apply {
            putExtra(AppWidget.EXTRA_ITEM, position)
            rv.setOnClickFillInIntent(R.id.widget_item, this)
        }
        return rv
    }
}


class WidgetItem (something : String) {
    val something = something
}